using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Skoll.Repositorios;

namespace Skoll.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        private readonly MD5 md5 = new MD5CryptoServiceProvider();
        public UsuarioController(IUsuarioRepositorio _usuarioRepo)
        {
            _usuarioRepositorio = _usuarioRepo;
        }

        // GET: api/Usuario
        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            return _usuarioRepositorio.GetAll();
        }

        // GET: api/Usuario/5
        [HttpGet("{id}", Name = "GetUsuario")]
        public IActionResult Get(int id)
        {
            var usuario = _usuarioRepositorio.Find(id);

            if (usuario == null)
                return NotFound();
            else
                return new ObjectResult(usuario);
        }

        // POST: api/Usuario
        [HttpPost]
        public IActionResult Post([FromBody] Usuario user)
        {
            if (user == null)
                return BadRequest();
              
            if(_usuarioRepositorio.FindByLogin(user.Login) != null)
            {
                return new BadRequestObjectResult($"Login: **{ user.Login }** já cadastrado!");
            }

            user.Senha = md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(user.Senha)).ToString();

            _usuarioRepositorio.Add(user);

            return CreatedAtRoute("GetUsuario", new { id = user.Id }, user);
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Usuario user)
        {
            if (user == null || user.Id != id)
                return BadRequest();

            var usuario = _usuarioRepositorio.Find(id);

            if (usuario == null)
                return BadRequest();

            usuario.Login = user.Login;
            usuario.Nome = user.Nome;
            if(!String.IsNullOrEmpty(user.Senha))
                usuario.Senha = md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(user.Senha)).ToString();
            usuario.Situacao = user.Situacao;

            _usuarioRepositorio.AddUpdate(usuario);

            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var usuario = _usuarioRepositorio.Find(id);

            if (usuario == null)
                return NotFound();

            _usuarioRepositorio.Remove(id);

            return new NoContentResult();
        }
    }
}
