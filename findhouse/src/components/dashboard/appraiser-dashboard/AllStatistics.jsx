const AllStatistics = ({
  properties,
  views,
  bids,
  wishlist,
  favourites,
  plans,
  plansNew,
  usedProp,
  totalNoOfProperties,
}) => {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const userTypes = Array.isArray(userData?.userType)
    ? userData.userType
    : [userData?.userType];

  // Extract plan details (assuming plans is an array)
  const planName = plans?.[0]?.planName || "N/A"; // Get first plan name or default "N/A"
  const numberOfProperties = plans?.[0]?.noOfProperties || "N/A"; // Assuming propertyCount is a field
  const planEndDate = plansNew?.[0]?.planEndDate || "N/A";

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
    };

    return new Date(dateString).toLocaleString("en-US", options);
  };

  // Define statistics
  const allStatistics = [
    {
      id: 1,
      blockStyle: "stylecardnew1",
      icon: "fa fa-home",
      timer: properties,
      name: "All Properties",
      visibleFor: [3, 5],
    },
    {
      id: 2,
      blockStyle: "stylecardnew2",
      icon: "fa fa-file",
      timer: bids,
      name: "Quotes Provided",
      visibleFor: [3],
    },
    {
      id: 3,
      blockStyle: "stylecardnew3",
      icon: "fa fa-check",
      timer: bids,
      name: "Quotes Accepted",
      visibleFor: [3],
    },
    {
      id: 4,
      blockStyle: "stylecardnew4",
      icon: "fa fa-edit",
      timer: favourites,
      name: "Quotes in Progress",
      visibleFor: [3],
    },
    {
      id: 5,
      blockStyle: "stylecardnew5",
      icon: "fa fa-check-circle",
      timer: favourites,
      name: "Quotes Completed",
      visibleFor: [3, 5],
    },
    {
      id: 6,
      blockStyle: "stylecardnew6",
      icon: "fa fa-pause",
      timer: favourites,
      name: "Quotes On Hold by Appraiser",
      visibleFor: [3, 5],
    },
    {
      id: 7,
      blockStyle: "stylecardnew7",
      icon: "fa fa-times-circle",
      timer: favourites,
      name: "Cancelled Properties",
      visibleFor: [3, 5],
    },
    {
      id: 8,
      blockStyle: "stylecardnew8",
      icon: "fa fa-pause",
      timer: favourites,
      name: "On Hold Properties by Broker",
      visibleFor: [3, 5],
    },
    {
      id: 9,
      blockStyle: "stylecardnew9",
      icon: "fa fa-credit-card",
      timer: planName,
      name: "Plan",
      visibleFor: [3],
    },
    {
      id: 10,
      blockStyle: "stylecardnew10",
      icon: "fa fa-hourglass-half",
      timer: formatDate(planEndDate),
      name: "Plan Validity",
      visibleFor: [3],
    },
    {
      id: 11,
      blockStyle: "stylecardnew11",
      icon: "fa fa-building",
      timer: totalNoOfProperties,
      name: "No. of Properties",
      visibleFor: [3],
    },
    {
      id: 12,
      blockStyle: "stylecardnew12",
      icon: "fa fa-home",
      timer: usedProp,
      name: "Used Properties",
      visibleFor: [3],
    },
  ];

  // Filter statistics based on user type
  const filteredStatistics = allStatistics.filter((stat) =>
    userTypes.some((type) => stat.visibleFor.includes(type))
  );

  return (
    <div className="statistics-container">
      {filteredStatistics.map((item) => (
        <div key={item.id} className={`ff_one ${item.blockStyle}`}>
          <div className="details">
            <div className="timer">{item.name}</div>
            <p>{item.timer}</p>
          </div>
          <div className="icon">
            <span className={item.icon}></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStatistics;
