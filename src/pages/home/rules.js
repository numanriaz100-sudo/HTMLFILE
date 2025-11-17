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

// Update results count
const updateResultsCount = (count) => {
  const countElement = document.getElementById("resultsCount");
  if (countElement) {
    countElement.textContent = `Showing ${count} of ${rules.length} rules`;
  }
};

// Display rules
const displayRules = (rulesToDisplay = rules) => {
  const container = document.getElementById("rulesContainer");

  if (rulesToDisplay.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-gray-400 text-lg mb-2">No rules found</div>
        <div class="text-gray-500 text-sm">Try adjusting your filters or add a new rule</div>
      </div>
    `;
    return;
  }

  container.innerHTML = rulesToDisplay.map((rule, i) => `
    <div class="bg-gray-900 p-5 rounded-lg shadow-xl border border-yellow-600 hover:border-yellow-500 transition-colors">
      <h3 class="text-xl font-bold text-yellow-300 mb-2">${rule.title}</h3>
      <p class="text-gray-300 mt-1 leading-relaxed">${rule.desc}</p>
      <div class="flex justify-center gap-3 mt-4">
        <button onclick="openEdit(${i})" class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors">Edit</button>
        <button onclick="deleteRule(${i})" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">Delete</button>
      </div>
    </div>
  `).join("");
};

// Initial display
displayRules();
updateResultsCount(rules.length);

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
  const searchText = document.getElementById("searchText").value.toLowerCase().trim();
  const startLetter = document.getElementById("startLetter").value.toLowerCase().trim();
  const wordFilter = document.getElementById("wordFilter").value.trim();
  const keywordFilter = document.getElementById("keywordFilter").value.toLowerCase().trim();

  const filtered = rules.filter(rule => {
    const title = rule.title.toLowerCase();
    const desc = rule.desc.toLowerCase();

    // Enhanced search text filter - supports multiple words and partial matches
    const matchesSearch = !searchText ||
      searchText.split(' ').every(word =>
        title.includes(word) || desc.includes(word)
      );

    // Start letter filter - checks if title starts with any of the entered letters
    const matchesStart = !startLetter ||
      startLetter.split('').some(letter =>
        title.startsWith(letter)
      );

    // Word/letter count filter - more flexible
    let matchesWord = true;
    if (wordFilter) {
      const count = parseInt(wordFilter);
      if (!isNaN(count)) {
        // Check if it's filtering by word count or letter count
        const isWordCount = wordFilter.includes('w') || wordFilter.includes('W');
        if (isWordCount) {
          const wordCount = desc.split(/\s+/).length;
          matchesWord = wordCount <= count;
        } else {
          // Letter count filter
          const titleLength = title.replace(/\s/g, '').length;
          const descLength = desc.replace(/\s/g, '').length;
          matchesWord = titleLength <= count || descLength <= count;
        }
      }
    }

    // Enhanced keyword filter - supports multiple keywords separated by commas or spaces
    const matchesKeyword = !keywordFilter ||
      keywordFilter.split(/[,\s]+/).some(keyword =>
        keyword.trim() && (title.includes(keyword.trim()) || desc.includes(keyword.trim()))
      );

    return matchesSearch && matchesStart && matchesWord && matchesKeyword;
  });

  displayRules(filtered);

  // Update results count
  updateResultsCount(filtered.length);
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
  updateResultsCount(rules.length);
});
