using CheeseWizSociety.Models;
using CheeseWizSociety.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheeseWizSociety.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostsRepository _postsRepository;

        public PostsController(IPostsRepository postsRepository)
        {
            _postsRepository = postsRepository;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(_postsRepository.GetAllPosts());
        }

        [HttpGet("GetPostsWithComments")]
        public IActionResult GetAllPostsWithComments()
        {
            var posts = _postsRepository.GetAllPostsWithComments();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = _postsRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("GetPostByIdWithComments")]
        public IActionResult GetPostByIdWithComments(int id)
        {
            var posts = _postsRepository.GetPostByIdWithComments(id);
            return Ok(posts);
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_postsRepository.Search(q, sortDesc));
        }

        [HttpGet("hottest")]
        public IActionResult Hottest(bool sortDesc)
        {
            return Ok(_postsRepository.Hottest(sortDesc));
        }

        [HttpPost]
        public IActionResult AddPost(Posts post)
        {
            _postsRepository.AddPost(post);
            return Ok(post);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePost(int id, Posts post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postsRepository.UpdatePost(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            _postsRepository.DeletePost(id);
            return NoContent();
        }
    }
}
