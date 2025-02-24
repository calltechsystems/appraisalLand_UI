const AllStatistics = ({
  properties,
  views,
  bids,
  wishlist,
  favourites,
  plans,
  plansNew,
  totalNoOfProperties,
  usedProp,
}) => {
  // Extract plan details (assuming plans is an array)
  const planName = plans?.[0]?.planName || "N/A"; // Get first plan name or default "N/A"
  const numberOfProperties = plans?.[0]?.noOfProperties || "N/A"; // Assuming propertyCount is a field
  const planEndDate = plansNew?.[0]?.planEndDate || "N/A";
  const usedProperty = usedProp;
  // console.log("plan valididty",planValidity)
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      hour12: true, // Set to false for 24-hour format
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const allStatistics = [
    {
      id: 1,
      blockStyle: "stylecardnew1",
      icon: "fa fa-home",
      timer: properties,
      name: "All Properties",
    },
    {
      id: 2,
      blockStyle: "stylecardnew2",
      icon: "fa fa-file",
      timer: bids,
      name: "Quotes Provided",
    },
    {
      id: 3,
      blockStyle: "stylecardnew3",
      icon: "fa fa-check",
      timer: bids,
      name: "Quotes Accepted",
    },
    {
      id: 4,
      blockStyle: "stylecardnew4",
      icon: "fa fa-edit",
      timer: views,
      name: "Quotes in Progress",
    },
    {
      id: 5,
      blockStyle: "stylecardnew5",
      icon: "fa fa-check-circle",
      timer: favourites,
      name: "Quotes Completed",
    },
    {
      id: 6,
      blockStyle: "stylecardnew6",
      icon: "fa fa-pause",
      timer: favourites,
      name: "Quotes On Hold by Appraiser",
    },
    {
      id: 7,
      blockStyle: "stylecardnew7",
      icon: "fa fa-times-circle",
      timer: favourites,
      name: "Cancelled Properties",
    },
    {
      id: 8,
      blockStyle: "stylecardnew8",
      icon: "fa fa-pause",
      timer: favourites,
      name: "On Hold Properties by Broker",
    },
    {
      id: 9,
      blockStyle: "stylecardnew9",
      icon: "fa fa-credit-card",
      timer: planName,
      name: "Plan",
    },
    {
      id: 10,
      blockStyle: "stylecardnew10",
      icon: "fa fa-hourglass-half",
      timer: formatDate(planEndDate),
      name: "Plan validity",
    },
    {
      id: 11,
      blockStyle: "stylecardnew11",
      icon: "fa fa-building",
      timer: totalNoOfProperties,
      name: "No. of Properties",
    },
    {
      id: 12,
      blockStyle: "stylecardnew12",
      icon: "fa fa-home",
      timer: usedProperty,
      name: "Used Properties",
    },
    // {
    //   id: 13,
    //   blockStyle: "stylecardnew13",
    //   icon: "flaticon-heart",
    //   timer: wishlist,
    //   name: "Wishlist Properties",
    // },
  ];

  return (
    <div className="statistics-container">
      {allStatistics.map((item) => (
        <div key={item.id} className={`ff_one ${item.blockStyle}`}>
          <div className="details">
            <div className="timer">{item.name}</div>
            <p>{item.timer}</p>
          </div>
          <div className="icon">
            <i className={item.icon}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStatistics;
