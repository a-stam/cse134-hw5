window.addEventListener("load", init);

/**
 * Initialize the app
 */
function init() {
    if (!localStorage.getItem("blogs")) {
        localStorage.setItem("blogs", JSON.stringify([]));
    }
    renderBlogs();
}

/** 
 * Render the blogs
 */
const renderBlogs = () => {
    const blogList = document.querySelector("#blog-list");
    blogList.innerHTML = "";
    const blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.forEach((blog) => {
        renderBlog(blog);
    });
};

/**
 * 
 * @param {Object} blog 
 */
const renderBlog = (blog) => {
    const blogList = document.querySelector("#blog-list");
    let blogItem = document.createElement("div");
    blogItem.innerHTML = `
        <div>
            <h3>${blog.title}</h3>
            <p>${blog.date}</p>
            <p>${blog.summary}</p>
        </div>
        <div>
            <button class="edit-blog"><span id='editButton' class='schedule-show material-icons edit-button'>edit</span></button>
            <button class="delete-blog"><span class='schedule-edit material-icons delete-button'>delete</span></button>
        </div>`;
    const editButton = blogItem.querySelector(".edit-blog");
    const deleteButton = blogItem.querySelector(".delete-blog");
    editButton.addEventListener("click", () => {
        blogDialog.showDialog(blog.id, blog.title, blog.date, blog.summary);
    });
    deleteButton.addEventListener("click", () => {
        blogList.removeChild(blogItem);
        const blogs = JSON.parse(localStorage.getItem("blogs"));
        const newBlogs = blogs.filter(
            (blogItem) => blogItem.id.toString() !== blog.id.toString()
        );
        localStorage.setItem("blogs", JSON.stringify(newBlogs));
    });
    blogList.appendChild(blogItem);
};

/**
 * Blog Dialog
 * @returns {Object}
 * @property {Function} showDialog
 * @property {Function} handleConfirmClick
*/
export const blogDialog = (() => {
    const dialog = document.querySelector("#blog-dialog");
    const resetDialog = () => {
        dialog.innerHTML = "";
    };

    /**
     * Function to handle the confirm click
     * 
     * @param {object} param0 
     * @param {number} param0.id
     * @param {string} param0.title
     * @param {string} param0.date
     * @param {string} param0.summary
     */
    const handleConfirmClick = ({ id, title, date, summary }) => {
        console.log("handleConfirmClick", { id, title, date, summary });
        if (id) {
            const blogs = JSON.parse(localStorage.getItem("blogs"))
            let blog = blogs.find(
                (blog) => blog.id.toString() === id.toString()
            );
            blog.title = title;
            blog.date = date;
            blog.summary = summary;
            localStorage.setItem("blogs", JSON.stringify(blogs));
        } else {
            const blogs = JSON.parse(localStorage.getItem("blogs"));
            let blog = {};
            if (blogs.length > 0) {
                blog.id = blogs[blogs.length - 1].id + 1;
            } else {
                blog.id = 1;
            }
            blog.title = title;
            blog.date = date;
            blog.summary = summary;
            blogs.push(blog);
            localStorage.setItem("blogs", JSON.stringify(blogs));
        }
        closeDialog();
        renderBlogs();
    };

    /**
     * Function to handle the cancel click
     */
    const handleCancelClick = () => {
        closeDialog();
    };

    /**
     * Function to close the dialog
     */
    const closeDialog = () => {
        dialog.close();
        resetDialog();
    };

    /**
     * Function to show the dialog
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} date 
     * @param {string} summary 
     */
    const showDialog = (id, title, date, summary) => {
        dialog.innerHTML = `
            <form id="blog-form" action="submitlog">
            <div style="display:flex;flex-direction:column">
                <input type="hidden" id="blog-id" />
                <label for="blog-title">Title</label>
                <input type="text" id="blog-title" />
                <label for="blog-date">Date</label>
                <input type="date" id="blog-date" />
                <label for="blog-summary">Summary</label>
                <textarea id="blog-summary"></textarea>
                <input type="submit" value="Save" />
                <input type="reset" value="Cancel" />
            </div>
            </form>`;
        const form = dialog.querySelector("#blog-form");
        const titleInput = dialog.querySelector("#blog-title");
        const dateInput = dialog.querySelector("#blog-date");
        const summaryInput = dialog.querySelector("#blog-summary");
        const idInput = dialog.querySelector("#blog-id");
        titleInput.value = title ? title : "";
        dateInput.value = date;
        summaryInput.value = summary ? summary : "";
        idInput.value = id ? id : null;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            handleConfirmClick({
                id: idInput.value,
                title: titleInput.value,
                date: dateInput.value,
                summary: summaryInput.value,
            });
        });
        form.addEventListener("reset", handleCancelClick);
        dialog.showModal();
    };

    return { showDialog, handleConfirmClick };
})();
