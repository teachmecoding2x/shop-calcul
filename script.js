const categories = {
    "home-appliances": {
        label: "Home Appliances",
        subcategories: {
            "vacuum-cleaners": ["Robot Vacuum", "Handheld Vacuum", "Upright Vacuum", "Canister Vacuum"],
            "refrigerators": ["Double Door", "Mini Fridge", "Side-by-Side"],
            "washing-machines": ["Front Load", "Top Load"],
            "air-conditioners": ["Window AC", "Split AC", "Portable AC"],
            "dishwashers": ["Compact Dishwasher", "Built-in Dishwasher"],
            "microwaves": ["Convection", "Solo", "Grill"]
        }
    },
    "health-and-fitness": {
        label: "Health and Fitness",
        subcategories: {
            "treadmills": ["Folding", "Manual", "Motorized"],
            "dumbbells": ["Adjustable Dumbbells", "Fixed Dumbbells"],
            "yoga-mats": ["Non-Slip", "Eco-Friendly"],
            "smartwatches": ["Fitness Trackers", "Full-Featured Smartwatches"],
            "massage-chairs": ["Full-Body Massage Chair", "Portable Massage Cushion", "Recliner Massage Chair"]
        }
    }
};

const categoryDropdown = document.getElementById("category");
const subcategoryDropdown = document.getElementById("subcategory");
const specificItemDropdown = document.getElementById("specific-item");
const calculateBtn = document.getElementById("calculate-btn");
const summaryDiv = document.getElementById("summary");
const summaryText = document.getElementById("summary-text");

// Populate categories
for (const key in categories) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = categories[key].label;
    categoryDropdown.appendChild(option);
}

// Update subcategories based on selected category
categoryDropdown.addEventListener("change", () => {
    const selectedCategory = categoryDropdown.value;
    subcategoryDropdown.innerHTML = ""; // Clear previous options
    specificItemDropdown.innerHTML = ""; // Clear specific items

    if (categories[selectedCategory]) {
        const subcategories = categories[selectedCategory].subcategories;
        for (const key in subcategories) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key.replace("-", " ").toUpperCase();
            subcategoryDropdown.appendChild(option);
        }
    }
});

// Update specific items based on selected subcategory
subcategoryDropdown.addEventListener("change", () => {
    const selectedCategory = categoryDropdown.value;
    const selectedSubcategory = subcategoryDropdown.value;
    specificItemDropdown.innerHTML = ""; // Clear previous options

    if (categories[selectedCategory] && categories[selectedCategory].subcategories[selectedSubcategory]) {
        const items = categories[selectedCategory].subcategories[selectedSubcategory];
        items.forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            specificItemDropdown.appendChild(option);
        });
    }
});

// Calculate total
calculateBtn.addEventListener("click", () => {
    const store = document.getElementById("store").value;
    const category = categoryDropdown.options[categoryDropdown.selectedIndex].text;
    const subcategory = subcategoryDropdown.options[subcategoryDropdown.selectedIndex]?.text || "N/A";
    const specificItem = specificItemDropdown.options[specificItemDropdown.selectedIndex]?.text || "N/A";
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (isNaN(price) || isNaN(quantity)) {
        alert("Please enter valid price and quantity.");
        return;
    }

    const total = price * quantity;

    summaryText.innerHTML = `
        <strong>Store:</strong> ${store} <br>
        <strong>Category:</strong> ${category} <br>
        <strong>Subcategory:</strong> ${subcategory} <br>
        <strong>Specific Item:</strong> ${specificItem} <br>
        <strong>Price:</strong> $${price.toFixed(2)} <br>
        <strong>Quantity:</strong> ${quantity} <br>
        <strong>Total:</strong> $${total.toFixed(2)}
    `;

    summaryDiv.style.display = "block";
});
