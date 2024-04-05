import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";

const UserNavigationPanel = () => {
  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-edit "></i>
          <span>Write</span>
        </Link>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
