using CheeseWizSociety.Models;
using CheeseWizSociety.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheeseWizSociety.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsRepository _commentsRepository;

        public CommentsController(ICommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }


        // GET: api/<CommentsController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentsRepository.GetAllComments());
        }

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentsRepository.GetCommentById(id);

            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // POST api/<CommentsController>
        [HttpPost]
        public IActionResult AddComment(Comments comment)
        {
            _commentsRepository.AddComment(comment);
            return Ok(comment);
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateComment(int id, Comments comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentsRepository.UpdateComment(comment);
            return NoContent();
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteComment(int id)
        {
            _commentsRepository.DeleteComment(id);
            return NoContent();
        }
    }
}
