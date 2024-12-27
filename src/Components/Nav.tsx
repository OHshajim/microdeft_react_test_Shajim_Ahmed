import Link from "next/link";

const Nav = () => {
  return (
    <div className="nav">
      <h3 className="navTitle">Microdeft</h3>
      <div>
      <Link href={"/"} id="addCourse">Home</Link>
      <Link href={"/addCourse"} id="addCourse">Add Course</Link>
      </div>
    </div>
  );
};

export default Nav;
