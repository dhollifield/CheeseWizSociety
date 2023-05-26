using CheeseWizSociety.Models;
using CheeseWizSociety.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheeseWizSociety.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeTypesController : ControllerBase
    {
        private readonly IRecipeTypesRepository _recipeTypesRepository;

        public RecipeTypesController(IRecipeTypesRepository recipeTypesRepository)
        {
            _recipeTypesRepository = recipeTypesRepository;
        }


        // GET: api/<RecipeTypesController>
        [HttpGet]
        public IActionResult GetAllRecipeTypes()
        {
            return Ok(_recipeTypesRepository.GetAllRecipeTypes());
        }

        // GET api/<RecipeTypesController>/5
        [HttpGet("{id}")]
        public IActionResult GetRecipeTypeById(int id)
        {
            var recipeType = _recipeTypesRepository.GetRecipeTypeById(id);

            if (recipeType== null)
            {
                return NotFound();
            }
            return Ok(recipeType);
        }

        // POST api/<RecipeTypesController>
        [HttpPost]
        public IActionResult AddRecipeType(RecipeTypes recipeType)
        {
            _recipeTypesRepository.AddRecipeType(recipeType);
            return Ok(recipeType);
        }

        // PUT api/<RecipeTypesController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateRecipeType(int id, RecipeTypes recipeType)
        {
            if (id != recipeType.Id)
            {
                return BadRequest();
            }

            _recipeTypesRepository.UpdateRecipeType(recipeType);
            return NoContent();
        }

        // DELETE api/<RecipeTypesController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteRecipeType(int id)
        {
            _recipeTypesRepository.DeleteRecipeType(id);
            return NoContent();
        }
    }
}
