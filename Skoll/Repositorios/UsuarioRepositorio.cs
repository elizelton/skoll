using Core.Entities;
using Skoll.Data;
using Skoll.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skoll.Repositorios
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {

        private readonly AppDbContext _contexto;
        public UsuarioRepositorio(AppDbContext ctx)
        {
            _contexto = ctx;
        }

        public void Add(Usuario usuario)
        {
            _contexto.Add(usuario);
            _contexto.SaveChanges();
        }

        public Usuario Find(long id)
        {
            return _contexto.Usuario.FirstOrDefault(x => x.Id == id);
        }

        public Usuario FindByLogin(string login)
        {
            return _contexto.Usuario.FirstOrDefault(x => x.Login == login);
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _contexto.Usuario.ToList();
        }

        public void Remove(long id)
        {
            var entity = _contexto.Usuario.FirstOrDefault(x => x.Id == id);
            _contexto.Usuario.Remove(entity);
            _contexto.SaveChanges();
        }

        public void Update(Usuario usuario)
        {
            _contexto.Usuario.Update(usuario);
            _contexto.SaveChanges();
        }
    }
}
