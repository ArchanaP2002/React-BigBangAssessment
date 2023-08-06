using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Models;

namespace Travel.Repository.Interface
{
    public interface IItinerary
    {
        Task<List<ItineraryDetail>> GetItineraryDetails();
        Task<ItineraryDetail> GetItineraryDetail(int id);
        Task<List<ItineraryDetail>> PutItineraryDetail(int id, ItineraryDetail itineraryDetail);
        Task<List<ItineraryDetail>> PostItineraryDetail(ItineraryDetail itineraryDetail);
        Task<List<ItineraryDetail>> DeleteItineraryDetail(int id);
        Task<List<ItineraryDetail>> GetItineraryDetailsByPackage(int packageId);

    }
}
