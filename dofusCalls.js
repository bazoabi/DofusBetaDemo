const isBeta = false;

const dofusVersion = isBeta ? "dofus3beta" : "dofus3";

// async function getSetsData(dofusVersion) {
//   const url =
//     `https://api.dofusdu.de/${dofusVersion}/v1/en/sets/all?` +
//     new URLSearchParams({
//       sort: "asc",
//       "filter[min_highest_equipment_level]": 190,
//       "filter[max_highest_equipment_level]": 200,
//     }).toString();

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//     return json.sets;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getSetsData("dofus3beta");

function getSetsData(dofusVersion) {
  const url =
    `https://api.dofusdu.de/${dofusVersion}/v1/en/sets/all?` +
    new URLSearchParams({
      sort: "asc",
      "filter[min_highest_equipment_level]": 190,
      "filter[max_highest_equipment_level]": 200,
    }).toString();
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error; // rethrow if you want to handle it later
    });
}

let v3Sets = [];
let v3BetaSets = [];

getSetsData("dofus3")
  .then((data) => {
    console.log(data);
    v3Sets = data;
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });

getSetsData("dofus3beta")
  .then((data) => {
    console.log(data);
    v3BetaSets = data;
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });
