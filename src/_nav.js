export default {
  items: [
    // {
    //   name: "Dashboard",
    //   url: "/dashboard",
    //   icon: "icon-speedometer",
    //   badge: {
    //     // variant: 'primary',
    //     // text: 'NEW'
    //   }
    // },
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
      name: "Shoppers User",
      url: "/shopper",
      icon: "icon-user",
      sequence: 5
    },
    {
      name: "Category",
      url: "/category",
      icon: "database",
      sequence: 5
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
      name: "Feature Products",
      url: "/feature-products",
      icon: "icon-directions",
      sequence: 15
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

    {
      name: "Approve pickup address",
      url: "/approve-address",
      icon: "icon-location-pin",
      sequence: 20
    },

    {
      name: 'Setting',
      // url: '/setting',
      icon: 'icon-settings',
      children: [
        {
          name: "Shiporder Login",
          url: "/shiporder-login",
          icon: "icon-lock",
          sequence: 1,
          // badge: {
          // variant: 'primary',
          // text: 'NEW'
          // }
        },
      ]
    },
  ]
};
