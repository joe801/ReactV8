import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  // UNCONTTROLLED FORM [getting data only on form submit]
  const [requestParams, setRequestParam] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  // adding pagination
  const [page, setPage] = useState(0);

  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams, page], fetchSearch);
  const pets = results?.data?.pets ?? []; // assign empty array if no result.data.pet
  const hasNext = results?.data?.hasNext;
  const nextPage = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  }

  const prevPage = () => {
    if (results.data.startIndex > 0) {
      setPage((prev) => prev - 1); 
    }
  }

  // useEffect(() => {
  //   requestPets();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target); // pulling out data from form (in object)
          const obj = {
            animal: formData.get("animal") ?? "", // .get gets value from name specified from form
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParam(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={breeds.length === 0} name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
      <div id="myButtons">
        <button onClick={prevPage} className={!results?.data?.startIndex > 0 ? "buttActive" : ""}>Prev</button>
        <button onClick={nextPage} className={!hasNext ? "buttActive" : ""}>Next</button>
      </div>
    </div>
  );
};

export default SearchParams;
