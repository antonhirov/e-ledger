// <copyright file="AuthWindow.xaml.cs" company="Anton Hirov - Private entrepreneur">
// Copyright (c) Anton Hirov - Private entrepreneur. All rights reserved.
// </copyright>

namespace ElectronicLedger.Desktop
{
    using System.Windows;
    using System.Windows.Input;
    using Wpf.Ui.Appearance;

    /// <summary>
    /// Interaction logic for MainWindow.xaml.
    /// </summary>
    public partial class AuthWindow : Window
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuthWindow"/> class.
        /// </summary>
        public AuthWindow()
        {
            this.InitializeComponent();

            // TODO: Remove window styles!
            this.Style = (Style)this.FindResource(typeof(Window));
            ApplicationThemeManager.Apply(ApplicationTheme.Light);
        }

        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseLeftButtonDown(e);
            this.DragMove();
        }

        private void OnCloseClick(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
