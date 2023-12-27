import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  counteryDataTypes,
  useCounteryContext,
} from '../Contexts/CounteryContext';
import Cookies from 'js-cookie';
import i18n from '../I18N';

function UserControlls() {
  const { t } = useTranslation();

  return (
    <header className=" bg-secondary text-bright py-3">
      <div className="my-container flex justify-between items-center">
        <div className="lang-count flex gap-4">
          <LangSelector />
          <CounterySelector />
        </div>
        <div className="auth flex gap-4">
          <UserLink text={t('login')} link="#" />
          <UserLink text={t('register')} style={'bgc'} link="#" />
        </div>
      </div>
    </header>
  );
}

type UserLinkProps = {
  text: string;
  style?: string | null;
  link: string;
};

function UserLink({ text, style = null, link }: UserLinkProps) {
  return (
    <a
      href={link}
      className={` outline-none rounded-md text-lg font-bold px-4 py-2 hover:bg-primary transition-colors duration-300 ${
        style && 'bg-bright text-dark '
      } ${style == null && 'text-primary'} hover:text-bright`}
    >
      {text}
    </a>
  );
}

function LangSelector() {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLang = (newLanguage: string) => {
    if (newLanguage === 'ar') document.documentElement.dir = 'rtl';
    else document.documentElement.dir = 'ltr';
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const currLanguage = Cookies.get('i18next') || 'en';
    i18n.changeLanguage(currLanguage);
    if (currLanguage === 'ar') document.documentElement.dir = 'rtl';
    else document.documentElement.dir = 'ltr';
  }, []);

  return (
    <div
      onMouseEnter={() => setIsLangOpen(true)}
      onMouseLeave={() => setIsLangOpen(false)}
      className="lang relative"
    >
      <button className="flex gap-1">
        {i18n.language === 'en' ? 'English' : 'عربي'}
        {isLangOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isLangOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            className="drop-down"
          >
            <li>
              <button onClick={() => toggleLang('ar')}>عربي</button>
            </li>
            <li>
              <button onClick={() => toggleLang('en')}>English</button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function CounterySelector() {
  const [isCounteryOpen, setIsCounteryOpen] = useState(false);
  const [counteries, setCounteries] = useState([]);
  const { currCountery, toggleCountery } = useCounteryContext();

  useEffect(() => {
    fetch('http://mohagado-001-site1.itempurl.com/Country')
      .then((res) => res.json())
      .then((data) => setCounteries(data));
  }, []);

  return (
    <div
      onMouseEnter={() => setIsCounteryOpen(true)}
      onMouseLeave={() => setIsCounteryOpen(false)}
      className="lang relative"
    >
      <button className="flex items-center gap-2 ">
        {currCountery.name}
        <img
          src={`/${currCountery.name}.svg`}
          className=" max-w-full w-5 h-5"
          alt={`${currCountery.name} flag`}
        />
        {isCounteryOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isCounteryOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            className="drop-down"
          >
            {counteries.map((countery: counteryDataTypes) => (
              <li key={`counter-${countery.id}`} className=" w-max">
                <button
                  onClick={() => toggleCountery(countery)}
                  className=" w-full flex items-center justify-between text-nowrap gap-1"
                >
                  {i18n.language === 'en' ? countery.name : countery.nameArabic}
                  <img
                    src={`/${countery.name}.svg`}
                    className=" max-w-full w-5 h-5"
                    alt={`${countery.name} flag`}
                  />
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserControlls;
