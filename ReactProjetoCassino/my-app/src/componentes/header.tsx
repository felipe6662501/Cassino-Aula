import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';

export function Header() {
  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Sobre',
      icon: 'pi pi-info-circle',
    },
    {
      label: 'Contato',
      icon: 'pi pi-envelope',
    }
  ];

  const start = <span className="font-bold text-xl ml-2">🎰 Casino App</span>;

  return (
    <div className="card">
      <Menubar model={items} start={start} />
    </div>
  );
}