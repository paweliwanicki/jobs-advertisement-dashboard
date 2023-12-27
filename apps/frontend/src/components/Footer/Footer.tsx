import SvgIcon from "../common/SvgIcon/SvgIcon";
import classes from "./Footer.module.scss";

const Footer = () => (
  <footer className={classes.footer}>
    <div className={classes.content}>
      <ul>
        <li>
          <a
            href="https://github.com/paweliwanicki/jobs-advertisement-dashboard"
            rel="noreferrer"
            target="blank"
          >
            <SvgIcon
              id="icon-github"
              width={30}
              height={30}
              viewBox="0 0 20 20"
            />
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l"
            rel="noreferrer"
            target="blank"
          >
            <SvgIcon
              id="icon-frontendmentor"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            />
            Frontendmentor.io
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/paweliwanicki92/"
            rel="noreferrer"
            target="blank"
          >
            <SvgIcon
              id="icon-linkedin"
              width={30}
              height={30}
              viewBox="0 0 32 32"
            />
            Linked.in
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
