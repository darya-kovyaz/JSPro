import { Store } from "pullstate";

export const Notifications = new Store({ notifications: [] });

export const showNotifications = (message, success) => {
    let id = Date.now();

    Notifications.update((s) => {
        if (success === "success") {
            s.notifications.push({ message, type: "success", id, status: "inBuffer" });
        } else if (success === "error") {
            s.notifications.push({ message, type: "error", id, status: "inBuffer" });
        }
    });

    setTimeout(() => {
        Notifications.update((s) => {
            s.notifications = s.notifications.map((i) => {
                if (i.id === id) {
                    return { ...i, status: "onScreen" };
                }
                return i;
            });
        });
    }, 200);

   

    setTimeout(() => {
        Notifications.update((s) => {
            s.notifications = s.notifications.map((i) => {
                if (i.id === id) {
                    return { ...i, status: "ghosting" };
                }
                return i;
            });
        });
    }, 3500);

    setTimeout(() => {
        Notifications.update((s) => {
            s.notifications = s.notifications.map((i) => {
                if (i.id === id) {
                    return { ...i, status: "offScreen" };
                }
                return i;
            });
        });
    }, 4800);

    setTimeout(() => {
        Notifications.update((s) => {
            s.notifications = s.notifications.filter((i) => i.id !== id);
        });
    }, 5000);
};
