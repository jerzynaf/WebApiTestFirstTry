using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace MvcTest.Models.ViewModels
{
    public class PersonViewModel
    {
        public int PersonId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [UIHint("YesNo")]
        [Display(Name = "Authorised")]
        public bool IsAuthorised { get; set; }

        public bool IsValid { get; set; }

        [UIHint("YesNo")]
        [Display(Name = "Enabled")]
        public bool IsEnabled { get; set; }

        public List<ColourViewModel> Colours { get; set; }

        public string FullName
        {
            get { return FirstName + " " + LastName; }
        }

        public string ColoursString
        {
            get { return string.Join(", ", Colours.OrderBy(c => c.Name).Select(c => c.Name)); }
        }

        [UIHint("YesNo")]
        public bool IsPalindrome
        {
            get
            {
                var fullName = FirstName.ToUpper() + LastName.ToUpper();
                return fullName.SequenceEqual(fullName.Reverse());
            }
        }
    }
}