using CheeseWizSociety.Models;
using CheeseWizSociety.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheeseWizSociety.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesesController : ControllerBase
    {
        private readonly ICheesesRepository _cheesesRepository;

        public CheesesController(ICheesesRepository cheesesRepository)
        {
            _cheesesRepository = cheesesRepository;
        }

        // GET: api/<CheesesController>
        [HttpGet]
        public IActionResult GetAllCheeses()
        {
            return Ok(_cheesesRepository.GetAllCheeses());
        }

        // GET api/<CheesesController>/5
        [HttpGet("{id}")]
        public IActionResult GetCheeseById(int id)
        {
            var cheese = _cheesesRepository.GetCheeseById(id);

            if (cheese == null)
            {
                return NotFound();
            }
            return Ok(cheese);
        }

        // POST api/<CheesesController>
        [HttpPost]
        public IActionResult AddCheese(Cheeses cheese)
        {
            _cheesesRepository.AddCheese(cheese);
            return Created("/api/cheese/" + cheese.Id, cheese);
        }

        // PUT api/<CheesesController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateCheese(Cheeses cheese, int id)
        {
            if (id != cheese.Id)
            {
                return BadRequest();
            }
                _cheesesRepository.UpdateCheese(cheese);
                return Ok(cheese);
        }

        // DELETE api/<CheesesController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCheese(int id)
        {
            var cheese = _cheesesRepository.GetCheeseById(id);

            if (cheese == null)
            {
                return NotFound();
            }
            _cheesesRepository.DeleteCheese(id);
            return NoContent();
        }
    }
}
