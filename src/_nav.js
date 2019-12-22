export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        // variant: 'primary',
        // text: 'NEW'
      }
    },
    {
      name: "Users",
      url: "/users",
      icon: "icon-user",
      badge: {
        // variant: 'primary',
        // text: 'NEW'
      }
    },
    {
      name: "Countries",
      url: "/countries",
      icon: "icon-location-pin",
      sequence: 5
    },
    {
      name: "Products",
      url: "/products",
      icon: "icon-directions",
      sequence: 14
    },
    {
      name: "Orders",
      url: "/orders",
      icon: "icon-order",
      sequence: 14
    },
    {
      name: "Customers",
      url: "/customer",
      icon: "icon-user",
      badge: {
        variant: "info",
        text: "NEW"
      },
      sequence: 14
    },
    {
      name: "Offers",
      url: "/offers",
      icon: "icon-offer",
      badge: {
        variant: "warning",
        text: "NEW"
      },
      sequence: 14
    },

    {
      name: "Complaint Categories",
      url: "/complaint-categories",
      icon: "icon-location-pin",
      sequence: 20
    },
    // {
    //   title: true,
    //   name: "Masters"
    // },
    // {
    //   name: "Masters",
    //   url: "/masters",
    //   icon: "icon-list",
    //   children: [
    //     {
    //       name: "Countries",
    //       url: "/countries",
    //       icon: "icon-location-pin",
    //       sequence: 5
    //     },
    //     {
    //       name: "Products",
    //       url: "/products",
    //       icon: "icon-directions",
    //       sequence: 14
    //     }
    //   ]
    // }
  ]
};
