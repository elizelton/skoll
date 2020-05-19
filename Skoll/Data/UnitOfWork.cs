using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Skoll.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skoll.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private AppDbContext _contexto = null;
        private bool disposed = false;


        private Repositorio<Usuario> usuarioRepositorio = null;

        public UnitOfWork(DbContextOptions<AppDbContext> option)
        {
            _contexto = new AppDbContext(option);
        }

        #region Interface Repositorios
        public IRepositorio<Usuario> UsuarioRepositorio
        {
            get
            {
                if (usuarioRepositorio == null)
                {
                    usuarioRepositorio = new Repositorio<Usuario>(_contexto);
                }
                return usuarioRepositorio;
            }

        }
        #endregion

        #region Metodos auxiliares
        public void Commit()
        {
            _contexto.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _contexto.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void RollBack()
        {
            _contexto.Dispose();
        }
        #endregion
    }
}
