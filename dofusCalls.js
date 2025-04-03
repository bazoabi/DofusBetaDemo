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

// getSetsData("dofus3")
//   .then((data) => {
//     v3Sets = data.sets;
//     console.log("v3Sets: ", v3Sets);
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   });

// getSetsData("dofus3beta")
//   .then((data) => {
//     v3BetaSets = data.sets;
//     console.log("v3BetaSets: ", v3BetaSets);
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   });

async function processSets() {
  const v3SetsData = await getSetsData("dofus3");
  const v3BetaSetsData = await getSetsData("dofus3beta");
  v3Sets = v3SetsData.sets;
  v3BetaSets = v3BetaSetsData.sets;
  console.log("v3Sets: ", v3Sets);
  console.log("v3BetaSets: ", v3BetaSets);

  const newlyAddedSets = v3BetaSets.filter((v3BetaSet) => {
    const filtered = v3Sets.filter((v3Set) => {
      return v3BetaSet.ankama_id == v3Set.ankama_id;
    });
    if (filtered.length > 0) {
      return false;
    }
    return true;
  });

  console.log(newlyAddedSets);

  const updatedSets = v3BetaSets.filter((v3BetaSet) => {
    const filtered = v3Sets.filter((v3Set) => {
      return compareArrs(v3BetaSet.equipment_ids, v3Set.equipment_ids);
    });
    if (filtered.length > 0) {
      return false;
    }
    return true;
  });

  console.log(updatedSets);
}

function compareArrs(arr1, arr2) {
  // compare two arrays of equipments ids, if they have same ids

  if (arr1.length !== arr2.length) return false;

  // Create copies and sort them
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  // Compare sorted arrays element by element
  for (let i = 0; i < sorted1.length; i++) {
    if (sorted1[i] !== sorted2[i]) return false;
  }
  return true;
}

processSets();

// console.log("v3Sets: ", v3Sets);
// console.log("v3BetaSets: ", v3BetaSets);
