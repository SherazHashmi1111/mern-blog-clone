export const deleteData = async (endpoint) => {
  const confirmed = confirm("Are you sure to delete this data?");
  
  if (!confirmed) {
    alert("Canceled");
    return false; // exit early, no backend call
  }

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || response.statusText);
    }

    alert("Deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Delete failed: " + error.message);
    return false;
  }
};