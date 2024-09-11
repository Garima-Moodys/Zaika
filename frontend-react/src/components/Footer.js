import styles from "../css/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <table>
        <thead>
          <th>LOCATIONS</th>
          <th>OPEN HOURS</th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td columnspan="2">
              <p>XYZ Main Street, Rajouri Garden, New Delhi,110034</p>
              <p>ABC Main Market, Gurgaon,110045</p>
            </td>
            <td columnspan="2">
              <p>Monday-Thursday: 10:00 AM - 10:00 PM</p>
              <p>Friday-Sunday: 10:00 AM - 11:00 PM</p>
            </td>
            <td>
              <p>
                Available for Catering
                <br />
                Email or Call Us
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>&copy; 2024 ZAIKA. All rights reserved.</p>
    </div>
  );
}
