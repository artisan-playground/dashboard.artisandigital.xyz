"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var DATA_1 = require("../DATA");
var store_1 = require("../store");
require("../styles/main.css");
function NavBar() {
    var Header = antd_1.Layout.Header;
    var Text = antd_1.Typography.Text, Link = antd_1.Typography.Link;
    var logout = store_1.useStoreActions(function (a) { return a.userState.logOut; });
    function onLogoutClick() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, logout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var notifications = (react_1["default"].createElement(antd_1.Menu, null, DATA_1.TASK_DATA.filter(function (task) { return task.team.filter(function (team) { return team.id === '1'; }); }).map(function (mapItem) { return (react_1["default"].createElement(antd_1.Menu.Item, null,
        react_1["default"].createElement(react_router_dom_1.Link, { to: {
                pathname: "/projects/" + mapItem.projectId,
                state: {
                    data: DATA_1.DATA[mapItem.projectId]
                }
            } },
            react_1["default"].createElement(Text, null, mapItem.taskName)))); })));
    var userDropDown = (react_1["default"].createElement(antd_1.Menu, null,
        react_1["default"].createElement(antd_1.Menu.Item, null,
            react_1["default"].createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "/profile" }, "Profile")),
        react_1["default"].createElement(antd_1.Menu.Item, null,
            react_1["default"].createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "/profile/edit" }, "Edit Profile")),
        react_1["default"].createElement(antd_1.Menu.Item, null,
            react_1["default"].createElement(Link, { onClick: onLogoutClick }, "Log out"))));
    return (react_1["default"].createElement(Header, { className: "bg-white h-16 px-0 py-0 min-w-full shadow-lg" },
        react_1["default"].createElement("div", { className: "flex flex-row justify-between" },
            react_1["default"].createElement("div", { className: "w-44 ml-4 my-2" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/" },
                    react_1["default"].createElement("img", { className: "w-44 h-12 hidden md:block", src: require('../assets/images/logo3.png'), alt: "logo" }),
                    react_1["default"].createElement("img", { className: "w-12 h-12 md:hidden block", src: require('../assets/images/logo5.png'), alt: "logo" }))),
            react_1["default"].createElement(antd_1.Menu, { theme: "light", mode: "horizontal", selectable: false, className: "w-auto h-16" },
                react_1["default"].createElement(MenuItemGroup, { title: "Item 1" },
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "1" },
                        react_1["default"].createElement(antd_1.Dropdown, { className: "px-2 py-0 w-full", overlay: notifications, placement: "bottomLeft", arrow: true },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(icons_1.BellOutlined, { style: { fontSize: 24 } }),
                                react_1["default"].createElement(antd_1.Badge, { count: DATA_1.TASK_DATA.filter(function (task) {
                                        return task.team.filter(function (taskTeam) { return taskTeam.id === '1'; });
                                    }).length, className: "-ml-4 -mt-4" })))),
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "2", className: "font-bold" },
                        react_1["default"].createElement(antd_1.Dropdown, { overlay: userDropDown, placement: "bottomCenter", arrow: true },
                            react_1["default"].createElement(antd_1.Row, { className: "justify-center items-center" },
                                react_1["default"].createElement("div", { className: "block hover:hidden" },
                                    react_1["default"].createElement(antd_1.Avatar, { src: "https://source.unsplash.com/600x600/?people", className: "border-2 mr-2 ", alt: "user", size: "large" }),
                                    "John Dee"),
                                react_1["default"].createElement("div", { className: "hover:block hidden" },
                                    react_1["default"].createElement(icons_1.DownOutlined, { style: { fontSize: 20 } })))))))),
        ") } export default NavBar"));
}
