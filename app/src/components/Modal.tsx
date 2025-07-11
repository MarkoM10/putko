const Modal = () => {
  return (
    <div>
      <div
        id="default-modal"
        aria-hidden="true"
        className="min-h-screen bg-black bg-opacity-50 flex fixed top-0 right-0 left-0 z-1 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="text-xl font-josefin font-bold text-gray-900 text-primary-400">
                Pregled putnih troškova
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-primary-400 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base text-secondary">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-primary-400 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Generiši PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
