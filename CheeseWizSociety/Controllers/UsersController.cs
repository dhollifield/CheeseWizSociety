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

        //// GET api/<UsersController>/5
        [HttpGet("GetUserWithFavCheese/{id}")]
        public IActionResult GetUserByIdWithFavCheeses(int id)
        {
            var user = _usersRepository.GetUserByIdWithFavCheeses(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/<UsersController>/7K03kD0LX9Sai6fpDUX1yV1RyPo1
        [HttpGet("{FirebaseUid}")]
        public IActionResult GetUserByFirebaseUid(string FirebaseUid)
        {
            var user = _usersRepository.GetUserByFirebaseUid(FirebaseUid);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //// GET api/<UsersController>/7K03kD0LX9Sai6fpDUX1yV1RyPo1
        //[HttpGet("{Email}")]
        //public IActionResult GetUserByEmail(string Email)
        //{
        //    var user = _usersRepository.GetUserByEmail(Email);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(user);
        //}

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult AddUser(Users user)
        {
            _usersRepository.AddUser(user);
            return Ok(user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, Users user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _usersRepository.UpdateUser(user);
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _usersRepository.DeleteUser(id);
            return NoContent();
        }
    }
}
