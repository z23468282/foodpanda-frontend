const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white fond-bold ">foodpanda</span>
        <span className="text-white font-bold flex gap-4">
          <span>隱私權政策</span>
          <span>服務條款</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
