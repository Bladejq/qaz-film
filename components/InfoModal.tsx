import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovie from "@/hooks/useMovie";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const [isExpanded, setIsExpanded] = useState(false);

  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!visible) {
    return null;
  }

  const shortText = data?.description?.slice(0, 150);

  return (
    <div
      className="
            z-50
            transition
            duration-300
            bg-black
            bg-opacity-80
            flex
            justify-center
            items-center
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0    
        "
    >
      <div
        className="
                relative
                w-auto
                mx-auto
                max-w-3xl
                rounded-md
                overflow-hidden
            "
      >
        <div
          className={`
                ${isVisible ? "scale-100" : "scale-0"}
                transform
                duration-300
                relative
                flex-auto
                bg-zinc-900
                drop-shadow-md
                `}
        >
          <div className="relative h-96">
            <video
              className="
                                   w-full
                                   brightness-[60%]
                                   object-cover
                                   h-full
                        "
              autoPlay
              muted
              loop
              poster={data?.thumbnail}
              src={data?.videoUrl}
            ></video>
            <div
              onClick={handleClose}
              className="
                                cursor-pointer
                                absolute
                                top-3
                                right-3
                                h-10
                                w-10
                                rounded-full
                                bg-black
                                bg-opacity-70
                                flex
                                items-center
                                justify-center

                        "
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div
              className="
                            absolute
                            bottom-[10%]
                            left-10
                        "
            >
              <p
                className="
                                text-white
                                text-3xl
                                md:text-4xl
                                h-full
                                lg:text-5xl
                                font-bold
                                mb-8
                            "
              >
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <div className="space-y-2 text-gray-300 text-sm md:text-base">
              <p>
                <span className="text-gray-500">Жанр:</span> {data?.genre}
              </p>

              <p>
                <span className="text-gray-500">Ұзақтығы:</span>{" "}
                {data?.duration}
              </p>


              <p>
                <span className="text-gray-500">Жылы:</span> {data?.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
