import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5 items-start">
        <div className="flex-1 flex justify-center items-center gap-4 cursor-pointer">
          <Image
            src={post?.creator.image}
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="user"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {sessionStorage?.user?.id === post?.creator?.id &&
      pathName === "/profile" ? (
        <>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              onClick={handleEdit}
              className="font-inter text-sm green_gradient cursor-pointer"
            >
              Edit
            </p>
            <p
              onClick={handleDelete}
              className="font-inter text-sm orange_gradient cursor-pointer"
            >
              Delete
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromptCard;
