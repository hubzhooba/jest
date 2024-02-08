const CustomPostDeleter = require("./deletePost");

class NotImplementedError extends Error {
  constructor(message = "Not implemented") {
    super(message);
    this.name = "NotImplementedError";
  }
}

describe("deletePost", () => {
  it("should throw a NotImplementedError", () => {
    const postDeleter = new CustomPostDeleter();
    expect(() => postDeleter.delete()).toThrow(NotImplementedError);
  });
});
