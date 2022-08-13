import { Fragment, useState } from "react";
import { Switch } from "@headlessui/react";
import { QRCodeSVG } from "qrcode.react";
import useLocalStorage from "../../utils/useLocalStorage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings({ settings, setSettings }) {
  const setSetting = (setting, value) => {
    if (setting === "synchronize" && value) {
      settings.identifier =
        settings.identifier || (Math.random() + 1).toString(36).substring(2);
    }

    settings[setting] = value;
    setSettings({ ...settings });
  };

  return (
    <Fragment>
      {/* Main section */}
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            General settings affecting the overall behavior.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={settings.name ?? ""}
              onChange={(event) => setSetting("name", event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          <div className="col-span-12">
            <label
              htmlFor="columns"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Number of columns
            </label>
            <select
              type="text"
              name="columns"
              id="columns"
              value={settings.columns ?? ""}
              onChange={(event) => setSetting("columns", event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sync section */}
      <div className="divide-y divide-gray-200 pt-6 dark:divide-gray-600">
        <div className="px-4 sm:px-6">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Synchronization
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Enable synchronization with a backend to enable cross-device
              synchronization.
            </p>
          </div>
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 dark:divide-gray-600"
          >
            <Switch.Group
              as="li"
              className="flex items-center justify-between py-4"
            >
              <div className="flex flex-col">
                <Switch.Label
                  as="p"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                  passive
                >
                  Enable synchronization
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500 dark:text-gray-300">
                  Once enabled we will transfer your encrypted configuration to
                  a storage backend. You can then cnnect addtional devices which
                  will use the same configuration.
                </Switch.Description>
              </div>
              <Switch
                checked={settings.synchronize}
                onChange={(value) => setSetting("synchronize", value)}
                className={classNames(
                  settings.synchronize ? "bg-primary-500" : "bg-gray-200",
                  "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.synchronize ? "translate-x-5" : "translate-x-0",
                    "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </Switch.Group>
          </ul>

          <div
            className={
              "grid grid-cols-2 gap-6 mb-6 " +
              (settings.synchronize || "opacity-50")
            }
          >
            <div className="">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Identifier
              </label>
              <input
                type="text"
                name="identifier"
                id="identifier"
                value={settings.identifier ?? ""}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              />
              <label
                htmlFor="password"
                className="mt-6 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                disabled={!settings.synchronize}
                value={settings.password ?? ""}
                onChange={(event) => setSetting("password", event.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm"
              />
            </div>
            {settings.synchronize && (
              <div className="text-center">
                <QRCodeSVG
                  width="128"
                  height="128"
                  className="inline rounded-md border-4 border-white"
                  value={`https://torii2.netlify.app/setup?identifier=${settings.identifier}&password=${settings.password}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="divide-y divide-gray-200 pt-6 dark:divide-gray-600">
        <div className="px-4 sm:px-6">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Danger Zone
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Danger zone, resetting all current state
            </p>
          </div>
          <div className="text-right">
            <button
              type="button"
              className="focus:red-500 inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
              onClick={() => {
                if (confirm("Really remove all data?")) {
                  localStorage.removeItem("theme");
                  localStorage.removeItem("settings");
                  localStorage.removeItem("modules");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
