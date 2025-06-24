ChiCom Admin Dashboard

The structure currently includes:

-context

|AuthContext: Context for login in

|MenuContext: To track which menu the user is on

|ThemeContext: To track Light/Dark theme.

-auth

| LoginScreen: The login menu the user first interact with

-pages

|SideBar: Menu on the left of the screen. Include logo, different menu and logout.

|TopBar: Menu on the top of the screen. Include search bar, current menu's name, light/dark mode switch, notification, user info

-App.tsx: Animation when switching between login and main app

-CSS: Using Module CSS. Color and shades store in index.css
