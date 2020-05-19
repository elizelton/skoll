using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Skoll.Data;
using Skoll.Entities;
using Skoll.Repositorios;
using Skoll.Util;

namespace Skoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private IUnitOfWork uow;

        private readonly MD5 md5 = new MD5CryptoServiceProvider();

        public AutenticacaoController(IUnitOfWork unitOfWork)
        {
            uow = unitOfWork;
        }

        [AllowAnonymous]
        [HttpPost]
        public object Post(
            [FromBody]Usuario usuario,
            [FromServices]SigningConfigurations signingConfigurations,
            [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (usuario == null || String.IsNullOrEmpty(usuario.Login) || String.IsNullOrEmpty(usuario.Senha))
                return BadRequest();

            var usuarioAutenticado = uow.UsuarioRepositorio.Get(u => u.Login == usuario.Login 
                                                                  && u.Senha == usuario.Senha 
                                                                  && u.Situacao == true);

            if (usuarioAutenticado != null)
            {
                ClaimsIdentity identity = new ClaimsIdentity(
                    new GenericIdentity(usuario.Login, "Login"),
                    new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Login)
                    }
                );

                DateTime dataCriacao = DateTime.Now;
                DateTime dataExpiracao = dataCriacao +
                    TimeSpan.FromHours(tokenConfigurations.Hours);

                var handler = new JwtSecurityTokenHandler();
                var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = tokenConfigurations.Issuer,
                    Audience = tokenConfigurations.Audience,
                    SigningCredentials = signingConfigurations.SigningCredentials,
                    Subject = identity,
                    NotBefore = dataCriacao,
                    Expires = dataExpiracao
                });
                var token = handler.WriteToken(securityToken);

                return new
                {
                    login = usuarioAutenticado.Login,
                    nome = usuarioAutenticado.Nome,
                    autenticado = true,
                    accessToken = token,
                    sessaoExpira = dataExpiracao
                };
            }
            else
            {
                return new
                {
                    autenticado = false,
                };
            }
        }
    }
}
