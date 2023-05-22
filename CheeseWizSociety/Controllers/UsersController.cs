using CheeseWizSociety.Models;
using CheeseWizSociety.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheeseWizSociety.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }


        // GET: api/<UsersController>
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_usersRepository.GetAllUsers());
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _usersRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult AddUser(Users user)
        {
            _usersRepository.AddUser(user);
            return Created("/api/user/" + user.Id, user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateUser(Users user)
        {
            _usersRepository.UpdateUser(user);
            return Created("/api/user/" + user.Id, user);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _usersRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            _usersRepository.DeleteUser(id);
            return NoContent();
        }
    }
}
