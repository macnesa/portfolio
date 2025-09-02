"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide, } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState, useEffect, Fragment } from "react";
import { motion, useAnimation, useScroll, useTransform, easeOut } from "framer-motion";
import {
  SiJavascript, SiTypescript, SiPhp, SiMysql, SiPostgresql, SiMongodb,
  SiReact, SiElectron, SiExpress, SiSequelize, SiRabbitmq, SiJest,
  SiGit, SiDocker, SiCss3, SiTailwindcss, SiSass, SiVuedotjs, SiNodedotjs, SiRedis
} from "react-icons/si";
import "swiper/css";
import { CodingTime } from "@/components/molecules/CodingTime";
import { ScrobbleTime } from "@/components/molecules/ScrobbleTime";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";


export default function Career() {
  // ---------- DATA ----------
  const images = [
    'https://i.imgur.com/A7kkGJs.jpeg',
    "https://i.imgur.com/G7tqnuj.jpeg",
    'https://i.imgur.com/8p3KOK3.jpeg',
    'https://i.imgur.com/YXjSkMn.jpeg',
    'https://i.imgur.com/STkwnjk.jpeg',
    'https://i.imgur.com/Dj0gYJa.jpeg',
  ];
  const icons = [
    { icon: SiJavascript, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E" },
    { icon: SiNodedotjs, link: "https://nodejs.org/", color: "#339933" },
    { icon: SiTypescript, link: "https://www.typescriptlang.org/", color: "#3178C6" },
    { icon: SiPostgresql, link: "https://www.postgresql.org/", color: "#336791" },
    { icon: SiMongodb, link: "https://www.mongodb.com/", color: "#47A248" },
    { icon: SiPhp, link: "https://www.php.net/", color: "#777BB4" },
    { icon: SiMysql, link: "https://www.mysql.com/", color: "#4479A1" },
    { icon: SiReact, link: "https://reactjs.org/", color: "#61DAFB" },
    { icon: SiVuedotjs, link: "https://vuejs.org/", color: "#4FC08D" },
    { icon: SiElectron, link: "https://www.electronjs.org/", color: "#47848F" },
    { icon: SiExpress, link: "https://expressjs.com/", color: "#000000" },
    { icon: SiSequelize, link: "https://sequelize.org/", color: "#52B0E7" },
    { icon: SiRedis, link: "https://redis.io/insight/", color: "#DC382D" },
    { icon: SiRabbitmq, link: "https://www.rabbitmq.com/", color: "#FF6600" },
    { icon: SiJest, link: "https://jestjs.io/", color: "#C21325" },
    { icon: SiGit, link: "https://git-scm.com/", color: "#F05032" },
    { icon: SiDocker, link: "https://www.docker.com/", color: "#2496ED" },
    { icon: SiCss3, link: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#264DE4" },
    { icon: SiTailwindcss, link: "https://tailwindcss.com/", color: "#06B6D4" },
    { icon: SiSass, link: "https://sass-lang.com/", color: "#CC6699" }
  ];

  // ---------- STATE ----------
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const pathname = usePathname();
  

  // ---------- ANIMASI ----------
  const controls = useAnimation();
  const controls2 = useAnimation();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0 });

  const itemVariant = {
    hidden: { opacity: 0, y: 0, scale: 1 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, delay: i * 0.8, ease: easeOut },
    }),
  };

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, delay: 0.6 } });
  }, [controls, inView]);

  useEffect(() => {
    if (inView2) controls2.start({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, delay: 0.6 } });
  }, [controls2, inView2]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // ---------- MODAL ----------
  const openModal = (img: string) => {
    setSelectedImg(img);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // ---------- PARALLAX ----------
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[0.4fr_1fr] text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 relative overflow-hidden">

      {/* Left image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="hidden md:block relative max-h-[2000px] h-full"
      >
        <img
          className="h-full w-full object-cover brightness-90 contrast-110 max-w-full grayscale-25"
          src="https://i.pinimg.com/736x/66/3a/65/663a6530c00ab9c439ea1b16eeb15ce6.jpg"
          alt="career-bg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"
        />
      </motion.div>

      {/* Content */}
      <section className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
              the paths i've{" "}
              <span className="italic font-semibold border-b border-neutral-400 dark:border-neutral-600">
                taken
              </span>
            </h2>
            <h2 className="text-neutral-600 font-[fira_code] dark:text-neutral-400 text-xs sm:text-xs mt-2">
              highlighting the milestones that shaped my journey
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line cinematic */}
            <motion.div
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-transparent left-4 md:left-1/2 md:-translate-x-1/2 origin-top dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onAnimationComplete={() => controls.start("show")}
            />

            <div className="space-y-16 sm:space-y-20">
              {/* Block 1 - Zi.care */}
              <motion.div
                variants={itemVariant}
                initial="hidden"
                animate={controls}
                custom={0}
                className="relative flex flex-col md:flex-row md:items-center group"
              >
                <span
                  className="absolute top-6 w-6 h-6 rounded-full z-10 border-4 border-neutral-50 dark:border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 left-4 -translate-x-1/2 md:left-1/2 shadow-md"
                />

                <div className="order-1 md:order-2 md:w-1/2 md:pl-12 flex justify-start mb-6 md:mb-0 ml-12 md:ml-0">
                  <motion.img
                    className="h-10 max-w-full grayscale-25 drop-shadow-md"
                    src="https://zicare.id/upload/website/logo_header.svg"
                    alt="zi.care logo"
                  />
                </div>

                {/* <div className="order-2 md:order-1 md:w-1/2 md:pr-12 md:text-right ml-12 md:ml-0">
                  <h3 className="text-lg sm:text-xl font-semibold">Full Stack Engineer</h3>
                  <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    june 2023
                  </span>
                  <div className="mt-3 leading-relaxed text-sm sm:text-sm font-[fira_code]">
                    I joined <span className="font-medium">Zi.Care</span> as the youngest on the team and got picked to work onsite at hospitals. I was part of the sprint team, focused on building new features that always came with surprises and challenges—things I had never faced before. Every day was full of real cases, tight deadlines, and serious teamwork. The pressure was real but it taught me how a startup moves and gave me a solid feel for how a company actually works.
                  </div>
                </div> */}

                <div className="order-2 md:order-1 md:w-1/2 md:pr-12 md:text-right ml-12 md:ml-0">
                  <h3 className="text-lg sm:text-xl ">Full Stack Engineer</h3>
                  <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                     June 12 2023
                  </span>
                  <div className="mt-3 leading-relaxed text-sm sm:text-sm font-[fira_code]  dark:text-neutral-300 lowercase">
                    I joined <span className="font-medium">Zi.Care</span> as the youngest on the team and got picked to work onsite at hospitals. I was part of the sprint team, focused on building new features that always came with surprises and challenges—things I had never faced before. Every day was full of real cases, tight deadlines, and serious teamwork. The pressure was real but it taught me how a startup moves and gave me a solid feel for how a company actually works.
                  </div>

                  {/* Main Swiper */}
                  {/* <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        pagination={{ clickable: true }}
        className="mt-4 rounded-lg"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`Image ${idx + 1}`} className="w-full rounded-lg object-cover" />
          </SwiperSlide>
        ))}
      </Swiper> */}

                  {/* Thumbnails */}
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs]}
                    slidesPerView={4}
                    spaceBetween={0}
                    freeMode
                    watchSlidesProgress
                    className="mt-4   border-neutral-300 dark:border-neutral-600"
                  >
                    {images.map((img, idx) => (
                      <SwiperSlide key={idx} className="cursor-pointer" onClick={() => openModal(img)}>
                        <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-20 object-cover grayscale" />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Headless UI Dialog untuk popup */}
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={closeModal}>
                      {/* Background blur */}
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                      </Transition.Child>

                      {/* Centered panel */}
                      <div className="fixed inset-0 flex items-center justify-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          {/* Frame container */}
                          <div className="relative w-full max-w-2xl mx-auto bg-none shadow-2xl overflow-hidden">

                            {/* Main image wrapper */}
                            {selectedImg && (
                              <div className="relative max-w-max  border-red-200">
                                {/* Red dot button di kanan atas gambar */}
                                <button
                                  onClick={closeModal}
                                  className="absolute top-2 right-2 w-4 h-4 bg-red-400 rounded-full shadow-md z-20 cursor-pointer"
                                />

                                <img
                                  src={selectedImg}
                                  alt="Preview"
                                  className="w-full max-h-[85vh] object-contain rounded-2xl"
                                />
                              </div>
                            )}
                          </div>

                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition>


                </div>





              </motion.div>

              {/* Block 2 - Hacktiv8 */}
              <motion.div
                variants={itemVariant}
                initial="hidden"
                animate={controls}
                custom={1}
                className="relative flex flex-col md:flex-row md:items-center group"
              >
                <span
                  className="absolute top-6 w-6 h-6 rounded-full z-10 border-4 border-neutral-50 dark:border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 left-4 -translate-x-1/2 md:left-1/2 shadow-md"
                />

                <div className="md:w-1/2 md:pr-12 flex justify-start md:justify-end mb-6 md:mb-0 ml-12 md:ml-0">
                  <motion.img
                    className="h-10 sm:h-12 max-w-full grayscale-50 drop-shadow-md"
                    src="https://www.hacktiv8.com/footer_logo.svg"
                    alt="hacktiv8 logo"
                  />
                </div>

                <div className="md:w-1/2 md:pl-12 ml-12 md:ml-0 ">
                  <h3 className="text-lg sm:text-xl ">
                    Full Stack Immersive Student
                  </h3>
                  <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                    March 23 2023
                  </span>
                  <div className="mt-3 leading-relaxed text-sm sm:text-sm font-[fira_code] lowercase dark:text-neutral-300">
                    Completed the <span className="font-medium">Fullstack JavaScript Program</span> at Hacktiv8 after an intense 4-month journey of learning, coding day and night. Along the way, I met incredible peers who were equally committed, collaborated on exciting projects, and explored a tech stack that proved to be extremely useful—far beyond what I ever imagined. This experience not only strengthened my technical skills but also taught me resilience, teamwork, and the thrill of building things that matter.
                  </div>

                </div>
              </motion.div>

              {/* Closing */}
              <motion.div
                variants={itemVariant}
                initial="hidden"
                animate={controls}
                custom={2}
                className="relative flex flex-col md:flex-row md:items-center"
              >
                <span
                  className="absolute top-6 w-6 h-6 rounded-full z-10 border-4 border-neutral-50 dark:border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 left-4 -translate-x-1/2 md:left-1/2 shadow-md"
                />
                <motion.p
                  variants={itemVariant}
                  // initial={{ opacity: 0, y: 20 }}
                  // whileInView={{ opacity: 1, y: 0 }}
                  // transition={{ duration: 1 }}
                  className="italic text-neutral-600 dark:text-neutral-400 mt-8 md:w-1/2 md:pl-12 ml-12 md:ml-0 text-sm sm:text-base"
                >
                  can't wait to see the next chapter unfold...
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={controls}
            className="text-center mt-40"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
              technical skillset{" "}
              {/* <span className="italic font-bold border-b border-neutral-400 dark:border-neutral-600">
                activity
              </span> */}
            </h2>
            <h2 className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-xs mt-2 font-[fira_code]">
            languages and technologies I wield daily — sometimes as a programmer, sometimes as a poet
            </h2>
          </motion.div>

          <motion.div
            className="mt-4 justify-center flex flex-wrap gap-5 text-neutral-500 dark:text-neutral-400"
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ delay: 0.3 }}
            ref={ref}
            initial={{ opacity: 0, y: -10 }}
            animate={controls}
          >
            {icons.map(({ icon: Icon, link, color }, idx) => {
              const [hover, setHover] = useState(false); // per icon di map

              return (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  className="transition-colors duration-200"
                >
                  <Icon
                    size={28}
                    style={{ color: hover ? color : undefined }}
                    className="text-gray-500 dark:text-gray-400 transition-colors duration-200"
                  />
                </a>
              );
            })}
          </motion.div>


          {/* Header */}
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={controls2}
            className="text-center  mt-40"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
              activity log{" "}
              {/* <span className="italic font-bold border-b border-neutral-400 dark:border-neutral-600">
                activity
              </span> */}
            </h2>
            <h2 className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-xs font-[fira_code] mt-2">
              tracking the hours I’ve spent building, exploring, and growing my skills
            </h2>
          </motion.div>

          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: -15 }}
            animate={controls2}
            className="text-center grid xl:grid-cols-2  gap-5"
          >

            <CodingTime />
            <ScrobbleTime />

          </motion.div>




        </div>
      </section>





    </section>
  );
}
