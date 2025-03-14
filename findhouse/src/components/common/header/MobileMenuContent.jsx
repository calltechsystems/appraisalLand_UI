import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const home = [
  {
    name: "Home 1",
    routerPath: "/",
  },
  {
    name: "Home 2",
    routerPath: "/home-2",
  },
  {
    name: "Home 3",
    routerPath: "/home-3",
  },
  {
    name: "Home 4",
    routerPath: "/home-4",
  },
  {
    name: "Home 5",
    routerPath: "/home-5",
  },
  {
    name: "Home 6",
    routerPath: "/home-6",
  },
  {
    name: "Home 7",
    routerPath: "/home-7",
  },
  {
    name: "Home 8",
    routerPath: "/home-8",
  },
  {
    name: "Home 9",
    routerPath: "/home-9",
  },
  {
    name: "Home 10",
    routerPath: "/home-10",
  },
];

const listing = [
  {
    id: 1,
    title: "Listing Grid",
    items: [
      {
        name: "Grid v1",
        routerPath: "/listing-grid-v1",
      },
      {
        name: "Grid v2",
        routerPath: "/listing-grid-v2",
      },
      {
        name: "Grid v3",
        routerPath: "/listing-grid-v3",
      },
      {
        name: "Grid v4",
        routerPath: "/listing-grid-v4",
      },
      {
        name: "Grid v5",
        routerPath: "/listing-grid-v5",
      },
      {
        name: "Grid v6",
        routerPath: "/listing-grid-v6",
      },
    ],
  },
  {
    id: 2,
    title: "Listing List",
    items: [
      {
        name: "List V1",
        routerPath: "/listing-list-v1",
      },
    ],
  },
  {
    id: 3,
    title: "Listing Style",
    items: [
      {
        name: "Parallax Style",
        routerPath: "/parallax-style",
      },
      {
        name: "Slider Style",
        routerPath: "/slider-style",
      },
      {
        name: "Map Header",
        routerPath: "/map-header",
      },
    ],
  },
  {
    id: 4,
    title: "Listing Half",
    items: [
      {
        name: "Map V1",
        routerPath: "/listing-map-v1",
      },
      {
        name: "Map V2",
        routerPath: "/listing-map-v2",
      },
      {
        name: "Map V3",
        routerPath: "/listing-map-v3",
      },
      {
        name: "Map V4",
        routerPath: "/listing-map-v4",
      },
    ],
  },
  {
    id: 5,
    title: "Agent View",
    items: [
      {
        name: "Agent V1",
        routerPath: "/agent-v1",
      },
      {
        name: "Agent V2",
        routerPath: "/agent-v2",
      },
      {
        name: "Agent Details",
        routerPath: "/agent-details",
      },
    ],
  },
  {
    id: 6,
    title: "Agencies View",
    items: [
      {
        name: "Agencies V1",
        routerPath: "/agency-v1",
      },
      {
        name: "Agencies V2",
        routerPath: "/agency-v2",
      },
      {
        name: "Agencies Details",
        routerPath: "/agency-details",
      },
    ],
  },
  {
    id: 7,
    title: "Create Listing",
    items: [
      {
        name: "Create Listing",
        routerPath: "/create-listing",
      },
    ],
  },
];

const property = [
  {
    id: 1,
    title: "User Admin",
    items: [
      {
        name: "Dashboard",
        routerPath: "/my-dashboard",
      },
      {
        name: "My Properties",
        routerPath: "/my-properties",
      },
      {
        name: "My Message",
        routerPath: "/my-message",
      },
      {
        name: "My Review",
        routerPath: "/my-review",
      },
      {
        name: "My Favourites",
        routerPath: "/my-favourites",
      },
      {
        name: "My Profile",
        routerPath: "/my-profile",
      },
      {
        name: "My Package",
        routerPath: "/my-package",
      },
      {
        name: "My Saved Search",
        routerPath: "/my-saved-search",
      },
      {
        name: "Add Property",
        routerPath: "/create-listing",
      },
    ],
  },
  {
    id: 2,
    title: "Listing Single",
    items: [
      {
        name: "Single V1",
        routerPath: "/listing-details-v1",
      },
      {
        name: "Single V2",
        routerPath: "/listing-details-v2",
      },
      {
        name: "Single V3",
        routerPath: "/listing-details-v3",
      },
      {
        name: "Single V4",
        routerPath: "/listing-details-v4",
      },
    ],
  },
];

const insights = [
  {
    id: 1,
    name: "Insights",
    routerPath: "/my-dashboard",
  },
];

const whychooseus = [
  {
    id: 1,
    name: "Appraiser Company ",
    routerPath: "/appraiser-user-guide",
  },
  {
    id: 1,
    name: "Appraiser ",
    routerPath: "/appraiser-user-guide",
  },
  {
    id: 1,
    name: "Mortgage Brokerage ",
    routerPath: "/broker-user-guide",
  },
  {
    id: 1,
    name: "Mortgage Broker ",
    routerPath: "/broker-user-guide",
  },
];

const blog = [
  { id: 1, name: "Who We Are", routerPath: "/about-us" },
  { id: 2, name: "How We Work", routerPath: "/how-we-work" },
  { id: 3, name: "Events", routerPath: "/events" },
  // {
  //   id: 4,
  //   name: "Blog Details",
  //   routerPath: "/blog-details",
  // },
];
const membership = [
  { id: 1, name: "Mortgage Broker", routerPath: "/membership-broker" },
  { id: 2, name: "Appraiser", routerPath: "/membership-appraiser" },
  {
    id: 3,
    name: "Mortgage Brokerage",
    routerPath: "/membership-brokerage-company",
  },
  {
    id: 4,
    name: "Appraiser Company",
    routerPath: "/membership-appraiser-company",
  },
];

const pages = [
  {
    name: "About Us",
    routerPath: "/about-us",
  },
  {
    name: "Gallery",
    routerPath: "/gallery",
  },
  {
    name: "Faq",
    routerPath: "/faq",
  },
  {
    name: "LogIn",
    routerPath: "/login",
  },
  { name: "Compare", routerPath: "/compare" },
  { name: "Membership", routerPath: "/membership" },

  {
    name: "Register",
    routerPath: "/register",
  },
  {
    name: "Service",
    routerPath: "/service",
  },
  {
    name: "404 Page",
    routerPath: "/404",
  },
  {
    name: "Terms & Conditions",
    routerPath: "/terms",
  },
];

const MobileMenuContent = () => {
  const route = useRouter();
  return (
    <ProSidebar>
      <SidebarHeader>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-header-inner">
            <Image
              width={60}
              height={45}
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/Appraisal_Land_Logo.png"
              alt="header-logo.png"
            />
            {/* <span className="brand-text">Appraisal Land</span> */}
            <span
              className="brand-text"
              style={{
                marginTop: "35px",
                color: "#2e008b",
                marginLeft: "-25px",
              }}
            >
              Appraisal
            </span>
            <span
              className="brand-text"
              style={{
                marginTop: "35px",
                color: "#97d700",
                paddingLeft: "5px",
              }}
            >
              Land
            </span>
          </Link>
          {/* End .logo */}

          <div
            className="fix-icon text-danger"
            style={{}}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <span className="flaticon-close"></span>
          </div>
          {/* Mobile Menu close icon */}
        </div>

        {/* End logo */}
      </SidebarHeader>

      <SidebarContent>
        <Menu>
          <MenuItem>
            <Link
              href="/"
              className={route.pathname === "/" ? "ui-active" : undefined}
            >
              Home
            </Link>
          </MenuItem>

          <SubMenu
            title="About Us"
            className={
              blog.some(
                (page) =>
                  page.routerPath === route.pathname ||
                  page.routerPath + "/[id]" === route.pathname
              )
                ? "parent-menu-active"
                : undefined
            }
          >
            {blog.map((val, i) => (
              <MenuItem key={i}>
                <Link
                  href={val.routerPath}
                  className={
                    route.pathname === val.routerPath ||
                    val.routerPath + "/[id]" === route.pathname
                      ? "ui-active"
                      : undefined
                  }
                >
                  {val.name}
                </Link>
              </MenuItem>
            ))}
          </SubMenu>

          {/* <MenuItem>
            <Link
              href="/choose-us"
              className={
                route.pathname === "/choose-us" ? "ui-active" : undefined
              }
            >
              Why Choose Us
            </Link>
          </MenuItem> */}
          <SubMenu
            title="Why Choose Us"
            className={
              whychooseus.some((page) => page.routerPath === route.pathname)
                ? "parent-menu-active"
                : undefined
            }
          >
            {whychooseus.map((val, i) => (
              <MenuItem key={i} active={true}>
                <Link
                  href={val.routerPath}
                  className={
                    val.routerPath === route.pathname ? "ui-active" : undefined
                  }
                >
                  {val.name}
                </Link>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End Home Home */}

          {/* <SubMenu
            title="Insights"
            className={
              listing.some((parent) => {
                return parent.items.some(
                  (page) => page.routerPath === route.pathname
                );
              })
                ? "parent-menu-active"
                : undefined
            }
          >
            {listing.map((item) => (
              <SubMenu
                title={item.title}
                className={
                  item.items.some((page) => page.routerPath === route.pathname)
                    ? "ui-active plus alt"
                    : "plus alt"
                }
                key={item.id}
              >
                {item.items.map((val, i) => (
                  <MenuItem key={i}>
                    <Link
                      href={val.routerPath}
                      className={
                        route.pathname === val.routerPath
                          ? "ui-active"
                          : undefined
                      }
                    >
                      {val.name}
                    </Link>
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </SubMenu> */}
          {/* End Pages Listing */}

          {/* <SubMenu
            title="Property"
            className={
              property.some((parent) => {
                return parent.items.some(
                  (page) =>
                    page.routerPath === route.pathname ||
                    page.routerPath + "/[id]" === route.pathname
                );
              })
                ? "parent-menu-active"
                : undefined
            }
          >
            {property.map((item) => (
              <SubMenu
                title={item.title}
                className={
                  item.items.some(
                    (page) =>
                      page.routerPath === route.pathname ||
                      page.routerPath + "/[id]" === route.pathname
                  )
                    ? "ui-active plus alt"
                    : "plus alt"
                }
                key={item.id}
              >
                {item.items.map((val, i) => (
                  <MenuItem key={i}>
                    <Link
                      href={val.routerPath}
                      className={
                        route.pathname === val.routerPath ||
                        val.routerPath + "/[id]" === route.pathname
                          ? "ui-active"
                          : undefined
                      }
                    >
                      {val.name}
                    </Link>
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </SubMenu> */}
          {/* End Pages Property */}

          <SubMenu
            title="Dashboard"
            className={
              insights.some(
                (page) =>
                  page.routerPath === route.pathname ||
                  page.routerPath + "/[id]" === route.pathname
              )
                ? "parent-menu-active"
                : undefined
            }
          >
            {insights.map((val, i) => (
              <MenuItem key={i}>
                <Link
                  href={val.routerPath}
                  className={
                    route.pathname === val.routerPath ||
                    val.routerPath + "/[id]" === route.pathname
                      ? "ui-active"
                      : undefined
                  }
                >
                  {val.name}
                </Link>
              </MenuItem>
            ))}
          </SubMenu>

          {/* End pages Blog */}

          {/* <SubMenu
            title="Pages"
            className={
              pages.some((page) => page.routerPath === route.pathname)
                ? "parent-menu-active"
                : undefined
            }
          >
            {pages.map((val, i) => (
              <MenuItem key={i}>
                <Link
                  href={val.routerPath}
                  className={
                    route.pathname === val.routerPath ? "ui-active" : undefined
                  }
                >
                  {val.name}
                </Link>
              </MenuItem>
            ))}
          </SubMenu> */}
          {/* End pages Pages */}

          <MenuItem>
            <Link
              href="/membership"
              className={
                route.pathname === "/membership" ? "ui-active" : undefined
              }
            >
              Subscription
            </Link>
          </MenuItem>

          <SubMenu
            title="Subscription"
            className={
              membership.some((page) => page.routerPath === route.pathname)
                ? "parent-menu-active"
                : undefined
            }
          >
            {membership.map((val, i) => (
              <MenuItem key={i}>
                <Link
                  href={val.routerPath}
                  className={
                    route.pathname === val.routerPath ? "ui-active" : undefined
                  }
                >
                  {val.name}
                </Link>
              </MenuItem>
            ))}
          </SubMenu>

          {/* <MenuItem>
            <Link
              href="/about-us"
              className={
                route.pathname === "/about-us" ? "ui-active" : undefined
              }
            >
              About Us
            </Link>
          </MenuItem> */}

          <MenuItem>
            <Link
              href="/login"
              className={route.pathname === "/login" ? "ui-active" : undefined}
            >
              <span className="flaticon-user"></span> Login/Register
            </Link>
          </MenuItem>

          {/* <MenuItem>
            <Link
              href="/register"
              className={
                route.pathname === "/register" ? "ui-active" : undefined
              }
            >
              <span className="flaticon-edit"></span> Register
            </Link>
          </MenuItem> */}
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <Link href="contact" className="btn btn-block btn-lg btn-thm circle">
          <span className="" style={{ fontWeight: "bold" }}></span> GET IN TOUCH
        </Link>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default MobileMenuContent;
