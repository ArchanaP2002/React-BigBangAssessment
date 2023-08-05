using Microsoft.AspNetCore.Mvc;
using Travel.Models;

namespace Travel.Repository.Interface
{
    public interface IPackage
    {
        public Task<List<Packages>> GetPackages();
        public Task<Packages> GetPackage(int id);
        public Task<List<Packages>> PutPackage(int id, Packages package);
        public Task<List<Packages>> PostPackage([FromForm] PackageImage pi);
        public Task<List<Packages>> DeletePackage(int id);
    }
}
