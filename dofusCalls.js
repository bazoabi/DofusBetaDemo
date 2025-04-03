const isBeta = false;

const dofusVersion = isBeta ? "dofus3beta" : "dofus3";

async function getSetsData(dofusVersion) {
  const url =
    `https://api.dofusdu.de/${dofusVersion}/v1/en/sets/all?` +
    new URLSearchParams({
      sort: "asc",
      "filter[min_highest_equipment_level]": 190,
      "filter[max_highest_equipment_level]": 200,
    }).toString();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json.sets;
  } catch (error) {
    console.error(error.message);
  }
}

getSetsData("dofus3beta");
