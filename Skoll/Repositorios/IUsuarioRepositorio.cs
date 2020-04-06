using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skoll.Repositorios
{
    public interface IUsuarioRepositorio
    {
        void Add(Usuario usuario);

        IEnumerable<Usuario> GetAll();

        Usuario Find(long id);
        Usuario FindByLogin(string login);

        void Remove(long id);

        void Update(Usuario usuario);

    }
}
