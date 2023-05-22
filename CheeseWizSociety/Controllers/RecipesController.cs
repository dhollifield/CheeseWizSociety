using CheeseWizSociety.Models;
using CheeseWizSociety.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheeseWizSociety.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesRepository _recipesRepository;

        public RecipesController(IRecipesRepository recipesRepository)
        {
            _recipesRepository = recipesRepository;
        }


        // GET: api/<RecipesController>
        [HttpGet]
        public IActionResult GetAllRecipes()
        {
            return Ok(_recipesRepository.GetAllRecipes());
        }

        // GET api/<RecipesController>/5
        [HttpGet("{id}")]
        public IActionResult GetRecipeById(int id)
        {
            var recipe = _recipesRepository.GetRecipeById(id);

            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        // POST api/<RecipesController>
        [HttpPost]
        public IActionResult Add(Recipes recipe)
        {
            _recipesRepository.AddRecipe(recipe);
            return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        }

        // PUT api/<RecipesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipes recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _recipesRepository.UpdateRecipe(recipe);
            return NoContent();
        }

        // DELETE api/<RecipesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipesRepository.DeleteRecipe(id);
            return NoContent();
        }
    }
}
