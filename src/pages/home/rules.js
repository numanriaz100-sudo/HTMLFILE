// Load rules from LocalStorage
let rules = JSON.parse(localStorage.getItem("rules")) || [
  { title: "Wear Helmet", desc: "Always wear helmet while riding a bike." },
  { title: "Use Seatbelt", desc: "Seatbelt reduces injury risks." },
  { title: "Obey Traffic Signals", desc: "Follow traffic lights and road signs." },
  { title: "No Speeding", desc: "Drive within speed limits to prevent accidents." }
];

let editIndex = null;

// Save to LocalStorage
const saveToLS = () => localStorage.setItem("rules", JSON.stringify(rules));

// Display rules
const displayRules = (rulesToDisplay = rules) => {
  const container = document.getElementById("rulesContainer");
  container.innerHTML = rulesToDisplay.map((rule, i) => `
    <div class="bg-gray-900 p-5 rounded-lg shadow-xl border border-yellow-600">
      <h3 class="text-xl font-bold text-yellow-300">${rule.title}</h3>
      <p class="text-gray-300 mt-1">${rule.desc}</p>
      <div class="flex justify-center gap-3 mt-4">
        <button onclick="openEdit(${i})" class="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded">Edit</button>
        <button onclick="deleteRule(${i})" class="bg-red-600 hover:bg-red-700 px-4 py-1 rounded">Delete</button>
      </div>
    </div>
  `).join("");
};

// Initial display
displayRules();

// Add Rule
document.getElementById("ruleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("ruleTitle").value.trim();
  const desc = document.getElementById("ruleDesc").value.trim();
  if (!title || !desc) return;

  rules.push({ title, desc });
  saveToLS();
  e.target.reset();
  applyFilters();
});

// Delete Rule
window.deleteRule = (i) => {
  rules.splice(i, 1);
  saveToLS();
  applyFilters();
};

// Open Edit Modal
window.openEdit = (i) => {
  editIndex = i;
  document.getElementById("editTitle").value = rules[i].title;
  document.getElementById("editDesc").value = rules[i].desc;
  document.getElementById("editModal").classList.remove("hidden");
};

// Save Edit
document.getElementById("saveEdit").addEventListener("click", () => {
  const title = document.getElementById("editTitle").value.trim();
  const desc = document.getElementById("editDesc").value.trim();
  if (!title || !desc) return;

  rules[editIndex] = { title, desc };
  saveToLS();
  document.getElementById("editModal").classList.add("hidden");
  applyFilters();
});

// Cancel Edit
document.getElementById("cancelEdit").addEventListener("click", () => {
  document.getElementById("editModal").classList.add("hidden");
});

// ---------------- Filters ----------------
const applyFilters = () => {
  const searchText = document.getElementById("searchText").value.toLowerCase();
  const startLetter = document.getElementById("startLetter").value.toLowerCase();
  const wordFilter = document.getElementById("wordFilter").value.toLowerCase(); // user can type number of words
  const keywordFilter = document.getElementById("keywordFilter").value.toLowerCase();

  const filtered = rules.filter(rule => {
    const title = rule.title.toLowerCase();
    const desc = rule.desc.toLowerCase();
    const wordCount = desc.split(" ").length;

    // Search text filter
    const matchesSearch = !searchText || title.includes(searchText) || desc.includes(searchText);

    // Start letter filter
    const matchesStart = !startLetter || title.startsWith(startLetter);

     // ✅ Word length (based on number entered)
  let matchesWord = true;
  if (wordFilter) {
    const maxLetters = parseInt(wordFilter);
    if (!isNaN(maxLetters)) {
      const titleLength = title.length;
      const descLength = desc.length;
      matchesWord = titleLength <= maxLetters || descLength <= maxLetters;
    }
  }

    // Keyword filter
    const matchesKeyword = !keywordFilter || title.includes(keywordFilter) || desc.includes(keywordFilter);

    return matchesSearch && matchesStart && matchesWord && matchesKeyword;
  });

  displayRules(filtered);
};

// Event listeners
document.getElementById("searchText").addEventListener("input", applyFilters);
document.getElementById("startLetter").addEventListener("input", applyFilters);
document.getElementById("wordFilter").addEventListener("input", applyFilters);
document.getElementById("keywordFilter").addEventListener("input", applyFilters);
document.getElementById("resetFilters").addEventListener("click", () => {
  document.getElementById("searchText").value = "";
  document.getElementById("startLetter").value = "";
  document.getElementById("wordFilter").value = "";
  document.getElementById("keywordFilter").value = "";
  displayRules();
});
