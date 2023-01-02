import { Avatar, Dropdown, Footer, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { UserInterface } from "~/data/auth.server";

type Props = {
  children: React.ReactNode;
  user: UserInterface;
};

export const Layout: React.FC<Props> = ({ children, user }) => {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Link
            to="/"
            className="text-xl font-bold flex items-center lg:ml-2.5"
          >
            <img src="/logo.svg" className="h-6 mr-2" alt="Seetai Logo" />
            <span className="self-center whitespace-nowrap">
              SEETAI DIAMOND
            </span>
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block text-sm font-medium truncate">
                "email@email.com"
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Link to="/auth/logout">
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Link>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="ml-4">
          <Link to="/">
            <Navbar.Link>หน้าหลัก</Navbar.Link>
          </Link>
          <Link to="/orders">
            <Navbar.Link>รายการ</Navbar.Link>
          </Link>
          {/* <Link to="/reports"> */}
          {/* <Navbar.Link>Reports</Navbar.Link> */}
          <Dropdown label="รายงาน" inline={true}>
            <Dropdown.Item>ใบสั่งงาน</Dropdown.Item>
            <Dropdown.Item>ใบแจ้งหนี้</Dropdown.Item>
            <Dropdown.Item>รายงานการใช้ทอง</Dropdown.Item>
            <Dropdown.Item>รายงานการใช้เพชร</Dropdown.Item>
          </Dropdown>
          {/* </Link> */}

          {/* <Link to="/settings">
            <Navbar.Link>ตั้งค่า</Navbar.Link>
          </Link> */}
          <Dropdown label="ตั้งค่า" inline={true}>
            <Dropdown.Item>ผู้ใช้งานระบบ</Dropdown.Item>
            <Dropdown.Item>ลูกค้า</Dropdown.Item>
            <Dropdown.Item>ทอง</Dropdown.Item>
            <Dropdown.Item>เพชร</Dropdown.Item>
            <Dropdown.Item>โรงงาน</Dropdown.Item>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
      <div className="w-full px-8 py-4 bg-white rounded-md">{children}</div>
      <Footer container={true}>
        <Footer.Copyright
          by="seetaidiamond.com™"
          year={2022}
          className="flex justify-center md:justify-start"
        />
        <Footer.LinkGroup className="flex justify-between mt-2 md:mt-0">
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
};
