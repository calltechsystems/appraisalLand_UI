//this function will return the staticHeaders
const getStaticHeaders = (userFieldType) => {
  if (userFieldType == "appraiserCompany_Datails") {
    return [
      ["order_id", "Property ID"],
      ["address", "Property Address"],
      ["assigned_appraiser", "Assigned Appraiser"],
      ["status", "Status"],
      ["appraisal_status", "Appraisal Status"],
      ["remark", "Remark"],
      ["urgency", "Request Type"],
      ["date", "Order Submission Date"],
      ["type_of_building", "Type Of Property"],
      ["estimated_value", "Estimated Property Value ($)"],
      ["type_of_appraisal", "Type Of Appraisal"],
      ["purpose", "Purpose"],
      ["lender_information", "Lender Information"],
    ];
  }
};

//this function to extract element
function extractTextFromReactElement(element) {
  if (typeof element === "string") {
  } else if (Array.isArray(element)) {
    return element.map((child) => extractTextFromReactElement(child)).join("");
  } else if (typeof element === "object" && element !== null) {
    return extractTextFromReactElement(element.props.children);
  } else {
    return "";
  }
}

const getCreatedByName = (userFieldType) => {
  const userInfo = JSON.parse(localStorage.getItem("user")) || {};
  if (userFieldType === "appraiserCompany_Datails") {
    return `${userInfo?.[userFieldType]?.officeContactFirstName || "John"} ${
      userInfo?.[userFieldType]?.officeContactFirstName || "Doe"
    }`;
  }
  return `John Doe`;
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

function getFormattedDate() {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const getTheDownloadView = (userFieldType, allData, pdfTitle) => {
  return new Promise((resolve, reject) => {
    try {
      const staticHeaders = getStaticHeaders(userFieldType);
      const printContent = `
          <html>
  <head>
    <script>
      document.title = "PDF";
    </script>
    <style>
     @media print {
        @page {
          size: A4 landscape;
          margin: 0;
        }
    @media print {
  .footer {
    position: fixed;
    left: 0;
    right: 0;
  }
  

  
  .footer {
    bottom: 0;
  }
  
  /* Adjust the content container to avoid overlapping the fixed header/footer */
  .table-container {
    
    margin-bottom: 100px;  /* space for footer */
  }
}

      .pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header {
  width: 100%;
  padding: 10px;
  text-align:center;
}

.logo {
  height: 70px; /* Adjust size accordingly */
  width:80px;
}

.table-container {
  width: 100%;
  
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.footer {
  width: 100%;
  text-align: center;
  padding-top: 10px;
  font-size: 12px;
}

    </style>
  </head>
  <body>
    <div class="pdf-container">
  <!-- Header with Logo -->
  <div class="header">
    <img src="/assets/images/Appraisal_Land_Logo.png" alt="Company Logo" class="logo" />
    <h3>${pdfTitle}</h3>
  </div>

  <!-- Table Container -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          ${staticHeaders
            .map(
              (header) => `
          <th>${header[1]}</th>
          `
            )
            .join("")}
        </tr>
      </thead>
      <tbody>
        ${allData
          .map(
            (item) => `
        <tr>
          ${staticHeaders
            .map((header) => {
              if (
                header[0].toLowerCase() === "appraisal_status" ||
                header[0].toLowerCase() === "status" ||
                header[0]?.toLowerCase() === "assigned_appraiser"
              ) {
                const value = item[header[0].toLowerCase()];
                const className = value.props.className;
                const content =
                  header[0].toLowerCase() === "appraisal_status"
                    ? extractTextFromReactElement(
                        value.props.children
                      )?.split("Current Status")[0]
                    : value.props.children;
                const color = className.includes("btn-warning")
                  ? "#E4A11B"
                  : className.includes("btn-danger")
                  ? "#DC4C64"
                  : className.includes("btn-success")
                  ? "#14A44D"
                  : "#54B4D3";
                return `
          <td style="color: ${color};">${content}</td>
          `;
              } else {
                const updatedValue = item[header[0].toLowerCase()];
                return `
          <td>${updatedValue == undefined ? "N.A." : updatedValue}</td>
          `;
              }
            })
            .join("")}
        </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>© ${new Date().getFullYear()} <a
            href="https://appraisalland.ca/"
            target="_blank"
            style="color: #2e008b; text-decoration: none"
          >
            Appraisal Land </a
          >. All Rights Reserved. <span>Created by: ${getCreatedByName(userFieldType)}</span>
        <span>Created on: ${getFormattedDate()}</span></p>
  </div>
</div>

  </body>
</html>
`;

      const printWindow = window.open("", "", "width=1200,height=800");

      if (!printWindow) {
        reject(new Error("Failed to open print window"));
        return;
      }

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      printWindow.onload = function () {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          resolve("Printed successfully");
        };
      };
    } catch (error) {
      console.error({ error });
      reject(new Error("Error handling print"));
    }
  });
};
