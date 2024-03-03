import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Blog } from "../models/blog";

export default class BlogStore {
  blogRegistry = new Map<string, Blog>();
  selectedBlog: Blog | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get blogsById() {
    return Array.from(this.blogRegistry.values()).sort(
      (a, b) => parseInt(a.blogId) - parseInt(b.blogId)
    );
  }

  get blogOptions() {
    return Array.from(this.blogRegistry.values())
  }
  loadBlogs = async () => {
    this.loadingInitial = true;
    try {
      const blogs = await agent.Blogs.list();
      blogs.forEach((blog) => {
        this.setBlog(blog);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  

  loadBlog = async (blogId: string) => {
    let blog = this.getBlog(blogId);
    if (blog) {
      this.selectedBlog = blog;
    } else {
      this.loadingInitial = true;
      try {
        blog = await agent.Blogs.details(blogId);
        this.setBlog(blog);
        runInAction(() => {
          this.selectedBlog = blog;
        })
        this.setLoadingInitial(false);
        return blog;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setBlog = (blog: Blog) => {
    this.blogRegistry.set(blog.blogId, blog);
  };

  private getBlog = (blogId: string) => {
    return this.blogRegistry.get(blogId);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBlog = async (blog: Blog) => {
    this.loading = true;
    try {
      await agent.Blogs.create(blog);
      runInAction(() => {
        this.blogRegistry.set(blog.blogId, blog);
        this.selectedBlog = blog;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateBlog = async (blog: Blog) => {
    this.loading = true;
    try {
      await agent.Blogs.update(blog);
      runInAction(() => {
        this.blogRegistry.set(blog.blogId, blog);
        this.selectedBlog = blog;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteBlog = async (blogId: string) => {
    this.loading = true;
    try {
      await agent.Blogs.delete(blogId);
      runInAction(() => {
        this.blogRegistry.delete(blogId);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
