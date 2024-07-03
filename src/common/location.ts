export const Location = {
    base: '/',
    admin_control: '/admin/1/users/all',
    single_user: 'user/:userId',
    users: 'users/:contactId',
    home: 'home/:all'
}


// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <SideNavBar />,
//       errorElement: <ErrorPage />,
//       children: [
//         {
//           path: "admin/:page",
//           element: <SideNav />,
//           children: [
//             {
//               index: true,
//               element: <Users />,
//             },
//             {
//               path: "user/:userId",
//               element: <SingleUser />,
//             },
//             {
//               path: "users/:contactId",
//               element: <Users />,
//             },
//           ],
//         },
//         {
//           index: true,
//           element: <Home />,
//         },
//         {
//           path: "home/:all",
//           element: <Home />,
//         },
//       ],
//     },
//   ]);