document.addEventListener("DOMContentLoaded", () => {

    const postContainer = document.getElementsByClassName("postsContainer")[0];
    const allbtn = document.getElementById("all");
    const sportsbtn = document.getElementById("sports");
    const techbtn = document.getElementById("technology");
    const gamebtn = document.getElementById("games");
    const dailybtn = document.getElementById("dailylife");
    const buttons = document.querySelectorAll(".type");

    let blogs = [];

    const fetchData = async () => {
        try {
            const response = await fetch("/blogs");
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            blogs = await response.json();
            console.log(blogs);
        } catch (error) {
            console.log(error);
        }
    }
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((btn) => btn.style.backgroundColor = "grey");
            btn.style.backgroundColor = "blue";
        });
    });
    

    const renderPosts = (filteredBlogs) => {
        postContainer.innerHTML = filteredBlogs.slice(0, 6).map((blog) => {
            return `<div class="post" style="background-image: url('${blog.image}'); background-size: cover; background-repeat: no-repeat; object-fit: cover;">
                <h1> ${blog.title}</h1>
                <div class="post-footer">
                    <p> ${blog.post_date}</p>
                    <div class="post-footer-right">
                        <div class="post-footer-right-viewers">
                            <span class="material-symbols-outlined">
                                visibility
                            </span>
                            <p id="viewers"> ${blog.viewers} </p>
                        </div>
                        <a href="/blog/${encodeURIComponent(blog.title.toLowerCase().replace(' ', '-')) }"> See more → </a>
                    </div>
                </div>
           </div>`;
        }).join('');
    };

    const handleAllBtnClick = async () => {
        await fetchData();
        renderPosts(blogs);
    };

    const handleSportsBtnClick = async () => {
        await fetchData();
        const filteredBlogs = blogs.filter((blog) => blog.type.toLowerCase() === "sports");
        renderPosts(filteredBlogs);
    };

    const handleTechBtnClick = async () => {
        await fetchData();
        const filteredBlogs = blogs.filter((blog) => blog.type.toLowerCase() === "technology");
        renderPosts(filteredBlogs);
    };

    const handleGamesBtnClick = async () => {
        await fetchData();
        const filteredBlogs = blogs.filter((blog) => blog.type.toLowerCase() === "games");
        renderPosts(filteredBlogs);
    };

    const handleDailyBtnClick = async () => {
        await fetchData();
        const filteredBlogs = blogs.filter((blog) => blog.type.toLowerCase() === "dailylife");
        renderPosts(filteredBlogs);
    };

    allbtn.addEventListener("click", handleAllBtnClick);
    sportsbtn.addEventListener("click", handleSportsBtnClick);
    techbtn.addEventListener("click", handleTechBtnClick);
    gamebtn.addEventListener("click", handleGamesBtnClick);
    dailybtn.addEventListener("click", handleDailyBtnClick);


    // search blog
    const searchedBlogContainer = document.querySelector(".blogsFound")
    const search = document.getElementById("searchBox");

    search.addEventListener("input", (event) => {
        const searchTerm = event.target.value.trim().toLowerCase();

        if(searchTerm == "") {
            searchedBlogContainer.innerHTML = "";
            return;
        }

        const blogFound = blogs.filter((blog) => {
            return blog.title.toLowerCase().startsWith(searchTerm);
        })

    if(blogFound.length > 0) {
        searchedBlogContainer.style.display = "flex";
        searchedBlogContainer.innerHTML = 
        blogFound.map((blog) => 
            `<div class="blogsFoundBox"> 
            <img src="${blog.image}">
            <p> ${blog.title} </p>
            </div>
            `
        ).join('')
    }else {
        searchedBlogContainer.innerHTML = `<p> No Blogs Found </p>`
    }
        
       
    })


    fetchData().then(() => renderPosts(blogs));


    
});
