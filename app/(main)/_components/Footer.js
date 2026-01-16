"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Footer() {
  const [menuFooter, setMenuFooter] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/menu?type=${"footer"}`,
          {
            params: { mode: "frontend" },
          }
        );
        setMenuFooter(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Lỗi tải menu:", err);
      }
    };

    fetchMenus();
  }, []);
  return (
    <footer className="section-footer bg-secondary">
      <div className="container">
        <section className="footer-top padding-y-lg text-white">
          <div className="row">
            {menuFooter.map((menu) => (
              <aside key={menu.id} className="col-md col-6">
                <h6 className="title">{menu.name}</h6>
                {menu.children?.length > 0 && (
                  <ul className="list-unstyled">
                    <li>
                      {menu.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.link}
                          className="block"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </li>
                  </ul>
                )}
              </aside>
            ))}
          </div>
        </section>
        <section className="footer-bottom text-center">
          <p className="text-white">
            Privacy Policy - Terms of Use - User Information Legal Enquiry Guide
          </p>
          <p className="text-muted">
            &copy; 2025 Công ty bạn, All rights reserved
          </p>
        </section>
      </div>
    </footer>
  );
}
