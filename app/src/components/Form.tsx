const Form = () => {
  return (
    <div className="formWrapper my-6">
      <form className="flex flex-col">
        <div className="w-full grid md:grid-cols-2 md:gap-4">
          <div className="mb-5">
            <label
              htmlFor="origin"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Od
            </label>
            <input
              type="text"
              id="origin"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Unesi polaznu tačku..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="origin"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Do
            </label>
            <input
              type="text"
              id="destination"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Unesi odredišnu tačku..."
              required
            />
          </div>
          {/* <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Model
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option selected>Odaberi model vozila...</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Marka
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option selected>Odaberi marku vozila...</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Godina proizvodnje
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option selected>Odaberi godinu proizvodnje...</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-1 text-sm text-secondary font-inter"
            >
              Gorivo
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-border text-gray-900 text-sm rounded-lg block w-full p-2"
            >
              <option selected>Odaberi gorivo...</option>
              <option value="US">Dizel</option>
              <option value="CA">Benzin</option>
              <option value="FR">Gas</option>
              <option value="DE">Metan</option>
            </select>
          </div> */}
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="text-white bg-primary-400 hover:bg-primary-200 font-medium rounded-lg text-sm px-5 py-1.5 my-2 w-96"
          >
            Izračunaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
