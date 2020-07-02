const authMenuOptions = [
    {
        name: "Add Listing",
        link: "/listing/newListing",
        activeIndex: 5,
        selectedIndex: 0,
    },
    {
        name: "Your Favourites",
        link: `/user/userFavourites?id=${profile.uid}`,
        activeIndex: 5,
        selectedIndex: 1,
    },
    {
        name: "Your Listings",
        link: `/user/userListings?id=${profile.uid}`,
        activeIndex: 5,
        selectedIndex: 2,
    },
    {
        name: "Checkins",
        link: `/user/userCheckins?id=${profile.uid}`,
        activeIndex: 5,
        selectedIndex: 3,
    },
    {
        name: "Profile",
        link: `/profile/userProfile?id=${profile.uid}`,
        activeIndex: 5,
        selectedIndex: 4,
    },
    {
        name: "Sign Out",
        link: '/logout',
        activeIndex: 5,
        selectedIndex: 5,
        onClick: () => handleSignOut(),
    },
];

const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    { name: "About Us", link: "/about", activeIndex: 1 },
    { name: "The Board", link: "/the_board", activeIndex: 2 },
    { name: "Listings", link: "/listings", activeIndex: 3 },
];

const authRoutes = [
    {
        name: "Admin Area",
        link: "/admin",
        activeIndex: 4,
    },
    {
        name: profile.fullName,
        link: `/profile/userProfile?id=${profile.uid}`,
        activeIndex: 5,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        mouseOver: (event) => handleClick(event),
        end: true,
    },
];