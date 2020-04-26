using Core.Entities;
using Skoll.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skoll.Data
{
    public interface IUnitOfWork
    {
        IRepositorio<Usuario> UsuarioRepositorio { get; }

        void Commit();
        void RollBack();
    }
}
